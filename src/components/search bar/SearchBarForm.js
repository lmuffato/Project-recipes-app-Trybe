import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBarForm = () => {
  const [busca, setBusca] = useState('');
  const [markBusca, setMarkBusca] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    setBusca({ ...busca, [name]: value });
    setMarkBusca({ ...markBusca, [name]: value });
  };

  const handleSearchBarValue = () => (
    <Form.Group>
      <Form.Label htmlFor="id-busca">Busca:</Form.Label>
      <Form.Control
        type="text"
        id="id-busca"
        name="id-busca"
        onChange={ handleChange }
        data-testid="search-input"
      />
    </Form.Group>
  );

  const handleSearchBarMark = () => (
    <div className="d-flex">
      <Form.Group>
        <Form.Label>
          Ingrediente
          <Form.Control
            type="radio"
            name="busca"
            value="ingrediente"
            onChange={ handleChange }
            data-testid="ingredient-search-radio"
          />
        </Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Nome
          <Form.Control
            type="radio"
            name="busca"
            value="nome"
            onChange={ handleChange }
            data-testid="name-search-radio"
          />
        </Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Primeira Letra
          <Form.Control
            type="radio"
            name="busca"
            value="primeira-Letra"
            onChange={ handleChange }
            data-testid="first-letter-search-radio"
          />
        </Form.Label>
      </Form.Group>
    </div>
  );

  return (
    <div>
      <Form className="d-flex flex-column align-items-center bg-secondary">
        { handleSearchBarValue() }
        <div className="d-flex justify-content-center align-items-center">
          { handleSearchBarMark() }
          <Button
            data-testid="exec-search-btn"
          >
            Busca
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SearchBarForm;
