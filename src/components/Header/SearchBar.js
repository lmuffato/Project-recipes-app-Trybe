import React, { useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import FoodContext from '../../contexts/FoodContext';
import DrinkContext from '../../contexts/DrinkContext';

import {
  fetchFoodsByName,
  fetchFoodsByIngredient,
  fetchFoodsByFirstLetter } from '../../services/mealAPI';
import {
  fetchDrinksByName,
  fetchDrinksByIngredient,
  fetchDrinksByFirstLetter } from '../../services/cocktailAPI';

import '../../style/SearchBar.css';

export default function SearchBar() {
  const [searchType, setSearchType] = useState('');
  const [searchString, setSearchString] = useState('');

  const { setFoods } = useContext(FoodContext);
  const { setDrinks } = useContext(DrinkContext);

  const { pathname } = useLocation();
  const history = useHistory();

  function handleEdgeCases(recipes) {
    const isFood = pathname === '/comidas';

    if (!recipes) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return;
    }
    if (recipes.length === 1) {
      history.push(`${pathname}/${isFood ? recipes[0].idMeal : recipes[0].idDrink}`);
    }
  }

  function handleSearchByName(page, string) {
    if (page === '/comidas') {
      fetchFoodsByName(string).then((data) => {
        handleEdgeCases(data.meals);
        setFoods(data.meals);
      });
    }
    if (page === '/bebidas') {
      fetchDrinksByName(string).then((data) => {
        handleEdgeCases(data.drinks);
        setDrinks(data.drinks);
      });
    }
  }

  function handleSearchByIngredient(page, string) {
    if (page === '/comidas') {
      fetchFoodsByIngredient(string).then((data) => {
        handleEdgeCases(data.meals);
        setFoods(data.meals);
      });
    }
    if (page === '/bebidas') {
      fetchDrinksByIngredient(string).then((data) => {
        handleEdgeCases(data.drinks);
        setDrinks(data.drinks);
      });
    }
  }

  function handleSearchByFirstLetter(page, string) {
    if (string.length !== 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
      return;
    }

    if (page === '/comidas') {
      fetchFoodsByFirstLetter(string).then((data) => {
        handleEdgeCases(data.meals);
        setFoods(data.meals);
      });
    }
    if (page === '/bebidas') {
      fetchDrinksByFirstLetter(string).then((data) => {
        handleEdgeCases(data.drinks);
        setDrinks(data.drinks);
      });
    }
  }

  function submitSearch(event, type, page) {
    event.preventDefault();
    switch (type) {
    case 'name':
      handleSearchByName(page, searchString);
      break;
    case 'ingredient':
      handleSearchByIngredient(page, searchString);
      break;
    case 'first-letter':
      handleSearchByFirstLetter(page, searchString);
      break;
    default:
    }
  }

  return (
    <form className="form-searchbar">
      <div className="control">
        <label htmlFor="search-input">
          <input
            type="text"
            data-testid="search-input"
            onChange={ (event) => setSearchString(event.target.value) }
          />
        </label>
      </div>

      <div className="radio-inputs">
        <label
          htmlFor="search-radio"
          onChange={ (event) => setSearchType(event.target.value) }
        >
          <input
            id="search-radio-name"
            type="radio"
            name="search-radio"
            data-testid="name-search-radio"
            value="name"
          />
          {' '}
          Name
        </label>

        <label
          htmlFor="search-radio-ing"
          onChange={ (event) => setSearchType(event.target.value) }
        >
          <input
            id="search-radio-ing"
            type="radio"
            name="search-radio"
            data-testid="ingredient-search-radio"
            value="ingredient"
          />
          {' '}
          Ingredient
        </label>

        <label
          htmlFor="search-radio-letter"
          onChange={ (event) => setSearchType(event.target.value) }
        >
          <input
            id="search-radio-letter"
            type="radio"
            name="search-radio"
            data-testid="first-letter-search-radio"
            value="first-letter"
          />
          {' '}
          First Letter
        </label>
      </div>

      <div className="control">
        <button
          className="button is-primary"
          type="submit"
          data-testid="exec-search-btn"
          onClick={ (event) => submitSearch(event, searchType, pathname) }
        >
          Search
        </button>
      </div>
    </form>
  );
}
