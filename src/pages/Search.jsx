import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

function Search() {
  return (
    <Container>
      <Row>
        <Link to="/explorar/comidas">
          <button
            type="button"
            data-testid="explore-food"
          >
            Explorar Comidas
          </button>
        </Link>
      </Row>
      <Row>
        <Link to="/explorar/bebidas">
          <button
            type="button"
            data-testid="explore-drinks"
          >
            Explorar Bebidas
          </button>
        </Link>
      </Row>
    </Container>
  );
}

export default Search;
