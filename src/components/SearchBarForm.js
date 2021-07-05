import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { getIngCock, getIngCockTail, getNameCock,
  getNameCockTail, getFirstLetterCock, getFirstLetterCockTail,
} from '../services/fetchApiSearchBar';

const SearchBarForm = () => {
  const [busca, setBusca] = useState('');
  const [markBusca, setMarkBusca] = useState('');
  const location = useLocation();
  const FirstLetter = 'primeira-letra';

  const handleSearchBarApiComidas = async () => {
    if (markBusca === 'ingrediente') {
      getIngCock(busca).then((res) => console.log(res));
    }
    if (markBusca === 'nome') {
      getNameCock(busca).then((res) => res);
    }
    if (markBusca === FirstLetter) {
      getFirstLetterCock(busca).then((res) => res);
    }
    if (markBusca === FirstLetter && busca.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  };

  const handleSearchBarApiBebidas = async () => {
    if (markBusca === 'ingrediente') {
      getIngCockTail(busca).then((res) => res);
    }
    if (markBusca === 'nome') {
      getNameCockTail(busca).then((res) => res);
    }
    if (markBusca === FirstLetter) {
      getFirstLetterCockTail(busca).then((res) => console.log(res));
    }
    if (markBusca === FirstLetter && busca.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  };

  const handleFilterSearchBar = () => {
    if (location.pathname === '/comidas') return handleSearchBarApiComidas();
    if (location.pathname === '/bebidas') return handleSearchBarApiBebidas();
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
          onClick={ handleFilterSearchBar }
        >
          Busca
        </Button>
      </Form>
    </div>
  );
};

export default SearchBarForm;
