import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../Redux/bookSlice";
import BookCard from "../components/BookCard";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { BiLoaderCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import FilterPanel from "../components/FilterPanel";

const Home = () => {
  const dispatch = useDispatch();
  const { items: books, loading, error } = useSelector((state) => state.books);

  const [filterGenre, setFilterGenre] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("");

  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchBooks());
    }
  }, [dispatch, books.length]);

  const filteredBooks = books.filter((book) => {
    const genreMatch = filterGenre
      ? (book.genre || "").trim().toLowerCase() ===
        filterGenre.trim().toLowerCase()
      : true;

    const ratingValue = typeof book.rating === "number" ? book.rating : 0;
    const ratingMatch = ratingValue >= minRating;

    const matchesSearch = searchTerm
      ? (book.title || "").toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return genreMatch && ratingMatch && matchesSearch;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortKey === "title") return a.title.localeCompare(b.title);
    if (sortKey === "rating") return b.rating - a.rating;
    return 0;
  });

  const genres = Array.from(
    new Set(books.map((b) => (b.genre || "").trim().toLowerCase()))
  )
    .filter(Boolean)
    .map((g) => g.charAt(0).toUpperCase() + g.slice(1));

  return (
    <Container className=" my-4">
      <h2 className="mb-4">📚BookSnap</h2>
      <Link to="/add" className="btn btn-success">
        Add New Book
      </Link>
      <Link to="/about">
        <button className="btn btn-outline-primary ms-4">
          Go to About Page
        </button>
      </Link>

      <FilterPanel
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        genres={genres}
        filterGenre={filterGenre}
        setFilterGenre={setFilterGenre}
        minRating={minRating}
        setMinRating={setMinRating}
      />

      <div className="mb-3 text-end">
        <button
          className="btn btn-secondary"
          onClick={() => {
            setSearchTerm("");
            setFilterGenre("");
            setMinRating(0);
            setSortKey("");
          }}
        >
          Reset Filters
        </button>
      </div>

      {loading && (
        <div className="text-center my-4">
          <BiLoaderCircle className="ms-2 spin" color="gray" />
          <p>Loading books...</p>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && books.length === 0 && (
        <Alert variant="warning">No books available.</Alert>
      )}
      {!loading && filteredBooks.length === 0 && (
        <Alert variant="info">No books match the selected filters.</Alert>
      )}

      <Row>
        {filteredBooks.map((book) => (
          <Col key={book.id} sm={12} md={6} lg={4} xl={3}>
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
