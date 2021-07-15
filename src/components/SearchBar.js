import React, { useState } from 'react';
import { string } from 'prop-types';
import { useDispatch } from 'react-redux';
import { head } from 'lodash';

import { getFoodRecipesAPIThunk } from '../redux/actions/mealsAction';
import { getDrinkRecipesAPIThunk } from '../redux/actions/drinksAction';

const customAlert = alert;

function APIThunk(type) {
  return (endpoint) => {
    const MEAL_API = 'https://www.themealdb.com/api/json/v1/1';
    const DRINK_API = 'https://www.thecocktaildb.com/api/json/v1/1';
    const api = type === 'Comidas' ? MEAL_API : DRINK_API;
    switch (type) {
    case 'Comidas':
      return getFoodRecipesAPIThunk(`${api}/${endpoint}`);
    case 'Bebidas':
      return getDrinkRecipesAPIThunk(`${api}/${endpoint}`);
    default:
      throw new RangeError('Bad parameter in switch');
    }
  };
}

function SearchBar({ type }) {
  const [endpoint, setEndpoint] = useState('');
  const [searchParameter, setSearchParameter] = useState('');
  const dispatch = useDispatch();

  function search() {
    switch (endpoint) {
    case 'ingredient':
      dispatch(APIThunk(type)(`filter.php?i=${searchParameter}`));
      break;
    case 'name':
      dispatch(APIThunk(type)(`search.php?s=${searchParameter}`));
      break;
    case 'first-letter':
      if (searchParameter.length !== 1) {
        customAlert(
          'Sua busca deve conter somente 1 (um) caracter',
        );
        setSearchParameter(head(searchParameter));
      } else {
        dispatch(APIThunk(type)(`search.php?f=${searchParameter}`));
      }
      break;
    default:
      throw new RangeError('Bad parameter in switch');
    }
  }
  return (
    <section className="search">
      <div className="search-input">
        <label htmlFor="search-input">
          <input
            data-testid="search-input"
            value={ searchParameter }
            onChange={ ({ target: { value } }) => setSearchParameter(value) }
          />
        </label>
      </div>
      <div className="search-radio">
        <label htmlFor="ingredient">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            name="endpoint"
            value="ingredient"
            onClick={ ({ target: { value } }) => setEndpoint(value) }
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            data-testid="name-search-radio"
            name="endpoint"
            value="name"
            onClick={ ({ target: { value } }) => setEndpoint(value) }
          />
          Nome
        </label>
        <label htmlFor="first-letter">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            name="endpoint"
            value="first-letter"
            onClick={ ({ target: { value } }) => setEndpoint(value) }
          />
          Primeira Letra
        </label>
      </div>
      <div className="search-btn">
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ search }
        >
          Buscar
        </button>
      </div>
    </section>
  );
}

SearchBar.propTypes = {
  type: string.isRequired,
};

export default SearchBar;
