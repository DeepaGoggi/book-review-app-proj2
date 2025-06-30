import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../redux/bookSlice";
import BookCard from "../components/BookCard";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";

const Home = () => {
  const dispatch = useDispatch();
  const { items: books, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <Container className="my-4">
      <h2 className="mb-4">Books Collection</h2>
      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" role="status" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && books.length === 0 && (
        <Alert variant="warning">No books available.</Alert>
      )}

      <Row>
        {books.map((book) => (
          <Col key={book.id} sm={12} md={6} lg={4} xl={3}>
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
