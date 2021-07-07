import React, { useContext, useState } from 'react';
import '../App.css';
import { useHistory, useLocation } from 'react-router-dom';
import Context from '../context/Context';
import {
  getDrinkByFirstLetter,
  getDrinkByIngredient,
  getDrinksByName,
} from '../services/getDrinks';
import {
  getMealsByFirstLetter,
  getMealsByIngredient,
  getMealsByName,
} from '../services/getMeals';

export default function SearchBarFilters() {
  const { setMealsList, setDrinksList } = useContext(Context);
  const firstLetter = 'first-letter';
  const history = useHistory();
  const location = useLocation();
  const url = location.pathname;
  const isMeal = url === '/comidas';
  const [searchValue, setSearchValue] = useState({
    search: '',
    check: '',
  });
  const { search, check } = searchValue;

  const handleEdgeCase = (result) => {
    if (result.length === 1) {
      history.push(`${url}/${isMeal ? result[0].id : result[0].id}`);
    }
  };

  const handleSearchByIngredient = async () => {
    if (check === 'ingredient' && url === '/comidas') {
      const result = await getMealsByIngredient(search);
      setMealsList(result);
      handleEdgeCase(result);
    }
    if (check === 'ingredient' && url === '/bebidas') {
      const result = await getDrinkByIngredient(search);
      setDrinksList(result);
      handleEdgeCase(result);
    }
  };

  const handleSearchByName = async () => {
    if (check === 'name' && url === '/comidas') {
      const result = await getMealsByName(search);
      setMealsList(result);
      handleEdgeCase(result);
    }
    if (check === 'name' && url === '/bebidas') {
      const result = await getDrinksByName(search);
      setDrinksList(result);
      handleEdgeCase(result);
    }
  };

  const handleSearchByFirstLetter = async () => {
    if (check === firstLetter && url === '/comidas') {
      if (search.length !== 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        const result = await getMealsByFirstLetter(search);
        setMealsList(result);
        handleEdgeCase(result);
        console.log(result);
      }
    }
    if (check === firstLetter && url === '/bebidas') {
      if (search.length !== 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        const result = await getDrinkByFirstLetter(search);
        setDrinksList(result);
        handleEdgeCase(result);
      }
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    switch (check) {
    case 'name':
      handleSearchByName();
      break;
    case 'ingredient':
      handleSearchByIngredient();
      break;
    case 'first-letter':
      handleSearchByFirstLetter();
      break;
    default:
    }
  };

  const handleChange = ({ target }) => {
    if (target.name === 'check') {
      setSearchValue({ ...searchValue, check: target.value });
    } else {
      setSearchValue({ ...searchValue, search: target.value });
    }
  };

  return (
    <div className="searchbar-container">
      <form className="searchbar-form">
        <input
          className="search"
          type="text"
          placeholder="pesquise uma receita aqui"
          data-testid="search-input"
          onChange={ handleChange }
        />
        <label htmlFor="ingredients-radio">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredients-radio"
            name="check"
            value="ingredient"
            onChange={ handleChange }
          />
          Ingrediente
        </label>
        <label htmlFor="name-radio">
          <input
            type="radio"
            data-testid="name-search-radio"
            id="name-radio"
            name="check"
            value="name"
            onChange={ handleChange }
          />
          Nome
        </label>
        <label htmlFor="firstLetter-radio">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="firstLetter-radio"
            name="check"
            value="first-letter"
            onChange={ handleChange }
          />
          Primeira letra
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ (event) => handleClick(event) }
        >
          Buscar
        </button>
      </form>
    </div>
  );
}
