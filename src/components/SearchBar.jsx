import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import RecipeContext from '../context/RecipeContext';
import * as API from '../services/apiRequests';

function SearchBar({ type: requestType }) {
  const { setRecipes } = useContext(RecipeContext);
  const filter = (type, value) => {
    if (requestType === 'food') {
      switch (type) {
      case 'ingrediente':
        return API.foodsByIngredient(value, setRecipes);
      case 'name':
        return API.foodsByName(value, setRecipes);
      case 'firstLetter':
        return API.foodsByFirstLetter(value, setRecipes);
      default:
        break;
      }
    } else if (requestType === 'drink') {
      switch (type) {
      case 'ingrediente':
        return API.drinksByIngredient(value, setRecipes);
      case 'name':
        return API.drinksByName(value, setRecipes);
      case 'firstLetter':
        return API.drinksByFirstLetter(value, setRecipes);
      default:
        break;
      }
    } else {
      alert('Não é possivel fazer requisição');
    }
  };
  return (
    <form
      onSubmit={ (ev) => {
        ev.preventDefault();
        const { type, value } = ev.target.elements;
        filter(type.value, value.value);
      } }
    >
      <div>
        <input type="text" name="value" placeholder="Buscar Receita" />
        <label htmlFor="type">
          <label
            htmlFor="ingrediente"
          >
            <input
              type="radio"
              name="type"
              value="ingrediente"
              id="ingrediente"
              data-testid="ingredient-search-radio"
            />
            Ingrediente
          </label>
          <label htmlFor="name">
            <input
              type="radio"
              name="type"
              value="name"
              id="name"
              data-testid="name-search-radio"
            />
            Nome
          </label>
          <label htmlFor="firstLetter">
            <input
              type="radio"
              name="type"
              value="firstLetter"
              id="firstLetter"
              data-testid="first-letter-search-radio"
            />
            Primeira letra
          </label>
        </label>
      </div>
      <button type="submit">Buscar</button>
    </form>
  );
}

SearchBar.propTypes = {
  type: PropTypes.string.isRequired,
};

export default SearchBar;
