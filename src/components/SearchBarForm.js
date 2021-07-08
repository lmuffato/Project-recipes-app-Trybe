import React, { useContext, useEffect, useState } from 'react';
// import { Form, Button, Card } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
import { getIngCock, getIngCockTail, getNameCock,
  getNameCockTail, getFirstLetterCock, getFirstLetterCockTail,
} from '../services/fetchApiSearchBar';

import ContextComidas from '../provider/ContextComida';
import ContextBebidas from '../provider/ContextBebida';

const SearchBarForm = () => {
  const [busca, setBusca] = useState(''); // input text
  const [markBusca, setMarkBusca] = useState(''); // input radio

  const { data: dataCocks, setData: setDataCocks, originData: originDataCocks,
  } = useContext(ContextComidas);

  // const { data: dataDrinks, setData: setDataDrinks, originData: originDataDrinks,
  const { data: dataDrinks, setData: setDataDrinks,
  } = useContext(ContextBebidas);

  console.log('searchBarCock', dataCocks);
  console.log('searchBarDrink', dataDrinks);

  const history = useHistory();

  const location = useLocation();
  const FirstLetter = 'primeira-letra';
  const alerte = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  const teste = async () => {
    await setDataCocks(originDataCocks);
    console.log(dataCocks);
    alert(alerte);
  };

  useEffect(() => {
    if (dataCocks.length === 1 && location.pathname === '/comidas') {
      return history.push(`/comidas/${dataCocks[0].idMeal}`);
    }
    if (dataDrinks.length === 1 && location.pathname === '/bebidas') {
      return history.push(`/bebidas/${dataDrinks[0].idDrink}`);
    }
  }, [dataCocks, dataDrinks]);

  const handleSearchBarApiComidas = () => {
    if (markBusca === 'ingrediente') {
      getIngCock(busca).then(({ meals }) => setDataCocks(meals))
        .catch(() => (
          teste()));
    }
    if (markBusca === 'nome') {
      getNameCock(busca).then(({ meals }) => setDataCocks(meals))
        .catch(() => (
          alert(alerte)));
    }
    if (markBusca === FirstLetter) {
      getFirstLetterCock(busca).then(({ meals }) => setDataCocks(meals))
        .catch(() => (
          alert(alerte)));
    }
    if (markBusca === FirstLetter && busca.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const handleSearchBarApiBebidas = () => {
    if (markBusca === 'ingrediente') {
      getIngCockTail(busca).then(({ drinks }) => setDataDrinks(drinks));
    }
    if (markBusca === 'nome') {
      getNameCockTail(busca).then(({ drinks }) => setDataDrinks(drinks));
    }
    if (markBusca === FirstLetter) {
      getFirstLetterCockTail(busca).then(({ drinks }) => setDataDrinks(drinks));
    }
    if (markBusca === FirstLetter && busca.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const handleFilterSearchBar = () => { // req - 15
    if (location.pathname === '/comidas') return handleSearchBarApiComidas();
    if (location.pathname === '/bebidas') return handleSearchBarApiBebidas();
    console.log('id-Cocks', dataCocks[0].idMeal);
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
        {/* </Form.Group> */}
        {/* <Form.Group> */}
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
        {/* </Form.Group> */}
        {/* <Form.Group> */}
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
