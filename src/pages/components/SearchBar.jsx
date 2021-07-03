import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SearchBar() {
  const [searchText, setSearchText] = useState();

  return (
    <Container>
      <Row>
        <input
          data-testid="search-input"
          type="text"
          placeholder="Buscar receita"
          value={ searchText }
          onChange={ ({ target: { value } }) => setSearchText(value) }
        />
      </Row>
      <Row>
        <Col>
          <label htmlFor="ingredient">
            <input
              data-testid="ingredient-search-radio"
              id="ingredient"
              type="radio"
              value="ingredient"
              name="search-options"
            />
            Ingredientes
          </label>
        </Col>
        <Col>
          <label htmlFor="name">
            <input
              data-testid="name-search-radio"
              id="name"
              type="radio"
              value="name"
              name="search-options"
            />
            Nome
          </label>
        </Col>
        <Col>
          <label htmlFor="firstletter">
            <input
              data-testid="first-letter-search-radio"
              id="firstletter"
              type="radio"
              value="firstletter"
              name="search-options"
            />
            Primeira letra
          </label>
        </Col>
      </Row>
      <Row>
        <Col>
          <button
            data-testid="exec-search-btn"
            type="button"
          >
            Buscar
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default SearchBar;
