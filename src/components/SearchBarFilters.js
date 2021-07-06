import React, { useContext, useState } from 'react';
import './SearchBarFilters.css';
import { useLocation } from 'react-router-dom';
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
  const [searchValue, setSearchValue] = useState({
    search: '',
    check: '',
  });

  const location = useLocation();

  const { setMealsList, setDrinkList } = useContext(Context);
  const firstLetter = 'first-letter';

  const handleClick = async () => {
    const { search, check } = searchValue;
    const url = location.pathname;
    if (check === 'ingredient' && url === '/comidas') {
      const result = await getMealsByIngredient(search);
      setMealsList(result);
      console.log('teste', setMealsList);
    }
    if (check === 'ingredient' && url === '/bebidas') {
      const result = await getDrinkByIngredient(search);
      setDrinkList(result);
    }
    if (check === 'name' && url === '/comidas') {
      const result = await getMealsByName(search);
      setMealsList(result);
    }
    if (check === 'name' && url === '/bebidas') {
      const result = await getDrinksByName(search);
      setDrinkList(result);
    }
    if (check === firstLetter && url === '/comidas') {
      const result = await getMealsByFirstLetter(search);
      setMealsList(result);
    }
    if (check === firstLetter && url === '/bebidas') {
      const result = await getDrinkByFirstLetter(search);
      setDrinkList(result);
    }
  };

  const handleChange = ({ target }) => {
    const { check, search } = searchValue;
    if (search.length > 1 && check === firstLetter) {
      // eslint-disable-next-line no-alert
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
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
            value="name"
            onChange={ handleChange }
          />
          Primeira letra
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Buscar
        </button>
      </form>
    </div>
  );
}
