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

  /* Source: https://github.com/tryber/sd-09-project-recipes-app/tree/main-group-23 */
  const clickSearchButton = async () => {
    const { pathname } = history.location;
    if (pathname === '/bebidas') {
      const recipes = await searchDrinks(myChoice, searchTerm);
      if (recipes === null) {
        const { alert } = window;
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
        return;
      }
      if (recipes.length === 1) history.push(`/bebidas/${recipes[0].idDrink}`);
      setRecipesDrinks(recipes);
    }

    if (pathname === '/comidas') {
      const recipes = await searchFoods(myChoice, searchTerm);
      if (recipes === null) {
        const { alert } = window;
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
        return;
      }
      if (recipes.length === 1) history.push(`/comidas/${recipes[0].idMeal}`);
      console.log(recipes);
      setRecipesFoods(recipes);
    }
  };

  const handleMyChoice = (event) => {
    const { value } = event.target;
    setMyChoice(value);
  };

  return (
    <div>
      <input
        type="text"
        className="search-input"
        id="search-input"
        data-testid="search-input"
        placeholder="Digite sua busca"
        onChange={ ({ target: { value: searchText } }) => (
          setSearchTerm(searchText)) }
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
