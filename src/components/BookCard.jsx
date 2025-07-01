import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { FaStar, FaRegStar, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BiLoaderCircle } from "react-icons/bi";

const BookCard = ({ book }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(`/book/${book.id}`);
    }, 300);
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <Card className="m-2 shadow-sm hover-shadow" style={{ width: "18rem" }}>
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
    </div>
  );
};

export default BookCard;
