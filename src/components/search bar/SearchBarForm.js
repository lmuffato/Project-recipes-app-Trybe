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
    <div>
      <Form.Group>
        <Form.Label>
          <Form.Control
            type="radio"
            name="busca"
            value="ingrediente"
            onChange={ handleChange }
            data-testid="ingredient-search-radio"
          />
          Ingrediente
        </Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          <Form.Control
            type="radio"
            name="busca"
            value="nome"
            onChange={ handleChange }
            data-testid="name-search-radio"
          />
          Nome
        </Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          <Form.Control
            type="radio"
            name="busca"
            value="primeira-Letra"
            onChange={ handleChange }
            data-testid="first-letter-search-radio"
          />
          Primeira Letra
        </Form.Label>
      </Form.Group>
    </div>
  );

  return (
    <div>
      <Form>
        { handleSearchBarValue() }
        { handleSearchBarMark() }
        <Button
          data-testid="exec-search-btn"
        >
          Busca
        </Button>
      </Form>
    </div>
  );
};

export default SearchBarForm;
