/* eslint-disable no-alert */
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import searchFoods from '../../services/searchFoods';
import searchDrinks from '../../services/searchDrinks';
import RecipesContext from '../../context/RecipesContext';

import './style.css';

export default function HeaderSearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [myChoice, setMyChoice] = useState('');
  const history = useHistory();

  const { setRecipesDrinks, setRecipesFoods } = useContext(RecipesContext);
  const MAX_LENGTH_RECIPES = 12;

  const getDrinks = async () => {
    await searchDrinks(myChoice, searchTerm)
      .then((drinks) => {
        if (drinks.length === 1) history.push(`/bebidas/${drinks[0].idDrink}`);
        setRecipesDrinks(drinks.slice(0, MAX_LENGTH_RECIPES));
      })
      .catch(() => {
        const { alert } = window;
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      });
  };

  const getFoods = async () => {
    await searchFoods(myChoice, searchTerm)
      .then((foods) => {
        if (foods.length === 1) history.push(`/comidas/${foods[0].idMeal}`);
        setRecipesFoods(foods.slice(0, MAX_LENGTH_RECIPES));
      })
      .catch(() => {
        const { alert } = window;
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      });
  };

  /* Source: https://github.com/tryber/sd-09-project-recipes-app/tree/main-group-23 */
  const clickSearchButton = () => {
    if (searchTerm && myChoice) {
      const { pathname } = history.location;
      if (pathname === '/bebidas') {
        getDrinks();
      }
      if (pathname === '/comidas') {
        getFoods();
      }
    }
  };

  const handleMyChoice = (event) => {
    const { value } = event.target;
    setMyChoice(value);
  };

  return (
    <div data-testid="search-bar" className="search-bar-container">
      <input
        type="text"
        className="search-input"
        id="search-input"
        data-testid="search-input"
        placeholder="Digite sua busca"
        onChange={ ({ target: { value: searchText } }) => setSearchTerm(searchText) }
      />
      <br />
      <div className="radios">
        <label htmlFor="ingredient">
          <input
            type="radio"
            name="search-term"
            id="ingredient"
            data-testid="ingredient-search-radio"
            value="ingredient"
            onChange={ handleMyChoice }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            name="search-term"
            id="name"
            data-testid="name-search-radio"
            value="name"
            onChange={ handleMyChoice }
          />
          Name
        </label>
        <label htmlFor="first-letter">
          <input
            type="radio"
            name="search-term"
            id="first-letter"
            data-testid="first-letter-search-radio"
            value="first-letter"
            onChange={ handleMyChoice }
          />
          First Letter
        </label>
      </div>
      <br />
      <button
        className="btn-search"
        type="button"
        data-testid="exec-search-btn"
        onClick={ clickSearchButton }
      >
        Click Me
      </button>
    </div>
  );
}
