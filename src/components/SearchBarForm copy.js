import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { getIngCock, getIngCockTail, getNameCock,
  getNameCockTail, getFirstLetterCock, getFirstLetterCockTail,
} from '../services/fetchApiSearchBar';

const SearchBarForm = () => {
  const [busca, setBusca] = useState(''); // input text
  const [markBusca, setMarkBusca] = useState(''); // input radio
  const [dataDrinks, setDataDrinks] = useState({});
  const [dataCocks, setDataCocks] = useState({});

  // console.log(dataCocks);
  // console.log(dataDrinks);

  const location = useLocation();
  const history = useHistory();
  const FirstLetter = 'primeira-letra';
  const numberMagic = 12;

  const handleCardMapCocks = () => {
    const { meals } = dataCocks;

    if (meals === undefined) return 'undefined';

    if (meals.length === 1) return history.push(`/comidas/${meals[0].idMeal}`); // req -16

    return meals.map((meal, index) => {
      if (index < numberMagic) { // req - 17
        return (
          <Card
            style={ { width: '250px' } }
            key={ meal.idMeal }
            data-testid={ `${index}-recipe-card` }
          >
            <Card.Img
              alt={ `${meal.strMeal}` }
              src={ meal.strMealThumb }
              data-testid={ `${index}-card-img` }
            />
            <Card.Text data-testid={ `${index}-card-name` }>{meal.strMeal}</Card.Text>
          </Card>
        );
      }
      return null;
    });
  };

  const handleSearchBarApiComidas = () => {
    if (markBusca === 'ingrediente') {
      getIngCock(busca).then(({ meals }) => setDataCocks({ meals }));
    }
    if (markBusca === 'nome') {
      getNameCock(busca).then(({ meals }) => setDataCocks({ meals }));
    }
    if (markBusca === FirstLetter) {
      getFirstLetterCock(busca).then(({ meals }) => setDataCocks({ meals }));
    }
    if (markBusca === FirstLetter && busca.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    // return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  };

  const handleCardMapDrinks = () => {
    const { drinks } = dataDrinks;

    if (drinks === undefined) return 'undefined';

    if (drinks.length === 1) return history.push(`/bebidas/${drinks[0].idDrink}`); // req - 16

    return drinks.map((drink, index) => {
      if (index < numberMagic) { // req- 17
        return (
          <Card
            style={ { width: '250px' } }
            key={ drink.idDrink }
            data-testid={ `${index}-recipe-card` }
          >
            <Card.Img
              alt={ `${drink.strDrink}` }
              src={ drink.strDrinkThumb }
              data-testid={ `${index}-card-img` }
            />
            <Card.Text data-testid={ `${index}-card-name` }>{drink.strDrink}</Card.Text>
            <Card.Text data-testid={ `${index}-card-name` }>{drink.strTags}</Card.Text>
          </Card>
        );
      }
      return null;
    });
  };

  const handleSearchBarApiBebidas = () => {
    if (markBusca === 'ingrediente') {
      getIngCockTail(busca).then(({ drinks }) => setDataDrinks({ drinks }));
    }
    if (markBusca === 'nome') {
      getNameCockTail(busca).then(({ drinks }) => setDataDrinks({ drinks }));
    }
    if (markBusca === FirstLetter) {
      getFirstLetterCockTail(busca).then(({ drinks }) => setDataDrinks({ drinks }));
    }
    if (markBusca === FirstLetter && busca.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    // return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  };

  const handleFilterSearchBar = () => { // req - 15
    if (location.pathname === '/comidas') return handleSearchBarApiComidas();
    if (location.pathname === '/bebidas') return handleSearchBarApiBebidas();
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

  const handleCards = () => {
    if (location.pathname === '/comidas') return handleCardMapCocks();
    if (location.pathname === '/bebidas') return handleCardMapDrinks();
  };

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
      { handleCards() }
    </div>
  );
};

export default SearchBarForm;
