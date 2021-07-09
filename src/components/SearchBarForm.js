import React, { useContext, useEffect, useState } from 'react';
// import { Form, Button, Card } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { getIngCock, getIngCockTail, getNameCock,
  getNameCockTail, getFirstLetterCock, getFirstLetterCockTail,
} from '../services/fetchApiSearchBar';

import ContextComidas from '../provider/ContextComida';
import ContextBebidas from '../provider/ContextBebida';

const SearchBarForm = () => {
  const [busca, setBusca] = useState('');
  const [markBusca, setMarkBusca] = useState('');

  const { data: dataCocks, setData: setDataCocks, originData: originDataCocks,
  } = useContext(ContextComidas);

  const { data: dataDrinks, setData: setDataDrinks, originData: originDataDrinks,
  } = useContext(ContextBebidas);

  const HISTORY = useHistory();
  const LOCATION = useLocation();
  const FIRST_LETTER = 'primeira-letra';
  const ALERT_SINTO_MUITO = 'Sinto muito,'
    + ' não encontramos nenhuma receita para esses filtros.';

  useEffect(() => {
    if (dataCocks === null || dataDrinks === null) {
      alert(ALERT_SINTO_MUITO);
      setDataCocks(originDataCocks);
      setDataDrinks(originDataDrinks);
    }
    if (dataCocks && dataCocks.length === 1 && LOCATION.pathname === '/comidas') {
      return HISTORY.push(`/comidas/${dataCocks[0].idMeal}`);
    }
    if (dataDrinks && dataDrinks.length === 1 && LOCATION.pathname === '/bebidas') {
      return HISTORY.push(`/bebidas/${dataDrinks[0].idDrink}`);
    }
  }, [dataCocks, dataDrinks]);

  const handleSearchBarApiComidas = () => {
    if (markBusca === 'ingrediente') {
      getIngCock(busca).then(({ meals }) => setDataCocks(meals));
    }
    if (markBusca === 'nome') {
      getNameCock(busca).then(({ meals }) => setDataCocks(meals));
    }
    if (markBusca === FIRST_LETTER) {
      getFirstLetterCock(busca).then(({ meals }) => setDataCocks(meals));
    }
    if (markBusca === FIRST_LETTER && busca.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const handleSearchBarApiBebidas = () => {
    if (markBusca === 'ingrediente') {
      getIngCockTail(busca).then(({ drinks }) => setDataDrinks(drinks))
        .catch(() => alert(ALERT_SINTO_MUITO));
    }
    if (markBusca === 'nome') {
      getNameCockTail(busca).then(({ drinks }) => setDataDrinks(drinks));
    }
    if (markBusca === FIRST_LETTER) {
      getFirstLetterCockTail(busca).then(({ drinks }) => setDataDrinks(drinks));
    }
    if (markBusca === FIRST_LETTER && busca.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const handleFilterSearchBar = () => {
    if (LOCATION.pathname === '/comidas') return handleSearchBarApiComidas();
    if (LOCATION.pathname === '/bebidas') return handleSearchBarApiBebidas();
  };

  const handleSearchBarValue = () => (
    <Form.Group>
      <Form.Label htmlFor="id-busca">Busca:</Form.Label>
      <input
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
          <input
            type="radio"
            name="busca"
            value="ingrediente"
            onChange={ (e) => setMarkBusca(e.target.value) }
            data-testid="ingredient-search-radio"
          />
          Ingrediente
        </Form.Label>
        <Form.Label>
          <input
            type="radio"
            name="busca"
            value="nome"
            onChange={ (e) => setMarkBusca(e.target.value) }
            data-testid="name-search-radio"
          />
          Nome
        </Form.Label>
        <Form.Label>
          <input
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
