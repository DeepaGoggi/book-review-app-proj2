import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../redux/bookSlice";
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

  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchBooks());
    }
  }, [dispatch, books.length]);

  const filteredBooks = books.filter((book) => {
    const genreMatch = filterGenre ? book.genre === filterGenre : true;

    const ratingValue = typeof book.rating === "number" ? book.rating : 0;
    const ratingMatch = ratingValue >= minRating;

    const matchesSearch = searchTerm
      ? book.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return genreMatch && ratingMatch && matchesSearch;
  });
  // const filteredBooks = books.filter((book) => {
  //   const genreMatch = filterGenre ? book.genre === filterGenre : true;
  //   const ratingMatch =
  //     book.rating !== "Not rated" && parseFloat(book.rating) >= minRating;
  //   const matchesSearch = searchTerm
  //     ? book.title.toLowerCase().includes(searchTerm.toLowerCase())
  //     : true;
  //   return genreMatch && ratingMatch && matchesSearch;
  // });

  const genres = Array.from(new Set(books.map((b) => b.genre))).filter(Boolean);
  return (
    <Container className=" my-4">
      <h2 className="mb-4">Books Collection</h2>
      <Link to="/add" className="btn btn-success">
        Add New Book
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
