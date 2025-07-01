import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../redux/bookSlice";
import { Card, Container, Row, Col } from "react-bootstrap";
import { BiLoaderCircle } from "react-icons/bi";

const BookDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { items: books, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchBooks());
    }
  }, [dispatch, books]);

  const book = books.find((b) => b.id === id);

  if (loading || books.length === 0 || !book) {
    return (
      <Container className="text-center my-5">
        <BiLoaderCircle className="spin" size={50} color="gray" />
        <p className="mt-3">Loading book details...</p>
      </Container>
    );
  }

  if (error) return <p>Error: {error}</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <Container className="my-5">
      <Row>
        <Col md={4}>
          <img
            src={book.image || "https://via.placeholder.com/300x400"}
            alt={book.title}
            className="img-fluid rounded"
          />
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                by {book.author}
              </Card.Subtitle>
              <Card.Text>
                <strong>Genre:</strong> {book.genre || "N/A"} <br />
                <strong>Rating:</strong> {book.rating || "Not Rated"} <br />
                <strong>Description:</strong> <br />
                {book.description || "No description available."}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default BookDetails;
