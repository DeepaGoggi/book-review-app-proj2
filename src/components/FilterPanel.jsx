import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const FilterPanel = ({
  searchTerm,
  setSearchTerm,
  genres,
  filterGenre,
  setFilterGenre,
  minRating,
  setMinRating,
}) => {
  return (
    <Form className="mb-4">
      <Row className="align-items-end">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-3"
          />
        </Col>

        <Col md={4}>
          <Form.Group controlId="genreFilter">
            <Form.Label>Filter by Genre</Form.Label>
            <Form.Select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId="ratingFilter">
            <Form.Label>⭐Minimum Rating: {minRating}</Form.Label>
            <Form.Range
              min={0}
              max={5}
              step={0.5}
              value={minRating}
              onChange={(e) => setMinRating(parseFloat(e.target.value))}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterPanel;
