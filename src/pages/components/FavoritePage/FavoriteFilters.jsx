import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FavotireFilters(props) {
  const { handleClick } = props;
  const setFilter = (e) => {
    handleClick(e.target.name);
  };
  return (
    <Container className="categories-container">
      <Row xs="3" md="4" lg="6">
        <Col>
          <Button
            onClick={ setFilter }
            variant="outline-dark"
            data-testid="filter-by-all-btn"
            type="button"
            name="All"
          >
            All
          </Button>
        </Col>
        <Col key="food">
          <Button
            onClick={ setFilter }
            variant="outline-dark"
            data-testid="filter-by-food-btn"
            type="button"
            name="comida"
          >
            Food
          </Button>
        </Col>
        <Col key="drink">
          <Button
            onClick={ setFilter }
            variant="outline-dark"
            data-testid="filter-by-drink-btn"
            type="button"
            name="bebida"
          >
            Drink
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

FavotireFilters.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
