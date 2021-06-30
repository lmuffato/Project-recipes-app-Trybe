import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getIngrediente, getNome, getPrimeiraLetra,
} from '../services/fetchApiSearchBar';

const SearchBarForm = () => {
  const [busca, setBusca] = useState('');
  const [markBusca, setMarkBusca] = useState('');

  const handleSearchBarApi = async () => {
    if (markBusca === 'ingrediente') {
      getIngrediente(busca).then((res) => res);
    }
    if (markBusca === 'nome') {
      getNome(busca).then((res) => res);
    }
    if (markBusca === 'primeira-letra') {
      getPrimeiraLetra(busca).then((res) => res);
    }
    if (markBusca === 'primeira-letra' && busca.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const handleSearchBarValue = () => (
    <Form.Group>
      <Form.Label htmlFor="id-busca">Busca:</Form.Label>
      <Form.Control
        type="text"
        id="id-busca"
        name="id-busca"
        onChange={ (e) => setBusca(e.target.value) }
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
            onChange={ (e) => setMarkBusca(e.target.value) }
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
            onChange={ (e) => setMarkBusca(e.target.value) }
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
            value="primeira-letra"
            onChange={ (e) => setMarkBusca(e.target.value) }
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
          onClick={ handleSearchBarApi }
        >
          Busca
        </Button>
      </Form>
    </div>
  );
};

export default SearchBarForm;
