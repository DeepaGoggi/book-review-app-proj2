import React from "react";
import { Card } from "react-bootstrap";
import { FaStar, FaRegStar } from "react-icons/fa";

const BookCard = ({ book }) => {
  const renderStars = (rating) => {
    const stars = [];
    const rounded = Math.round(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < rounded ? (
          <FaStar key={i} color="gold" />
        ) : (
          <FaRegStar key={i} color="gold" />
        )
      );
    }
    return stars;
  };

  return (
    <Card className="m-2 shadow-sm" style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={book.image}
        alt={`${book.title} cover`}
        style={{ height: "250px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{book.title || "Untitled"}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {book.author || "Unknown Author"}
        </Card.Subtitle>
        <Card.Text>
          <strong>Genre:</strong> {book.genre || "N/A"}
          <br />
          <strong>Rating:</strong>{" "}
          {isNaN(book.rating) ? (
            "Not rated"
          ) : (
            <>
              {renderStars(book.rating)} ({book.rating})
            </>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
