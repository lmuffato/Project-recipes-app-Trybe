import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import RecipeContext from '../context/RecipeContext';
import * as API from '../services/apiRequests';

function SearchBar({ type: requestType }) {
  const { setRecipes, setRedirect } = useContext(RecipeContext);

  const setterWithLengthCheck = (value) => {
    if (value === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (value.length === 1) {
      const recipe = value.pop();
      if (requestType === 'food') {
        setRedirect(<Redirect to={ `/comidas/${recipe.idMeal}` } />);
      } else {
        setRedirect(<Redirect to={ `/bebidas/${recipe.idDrink}` } />);
      }
    } else {
      setRecipes(value);
    }
  };

  const filter = (type, value) => {
    if (requestType === 'food') {
      switch (type) {
      case 'ingrediente':
        return API.foodsByIngredient(value, setterWithLengthCheck);
      case 'name':
        return API.foodsByName(value, setterWithLengthCheck);
      case 'firstLetter':
        return API.foodsByFirstLetter(value, setterWithLengthCheck);
      default:
        break;
      }
    } else if (requestType === 'drink') {
      switch (type) {
      case 'ingrediente':
        return API.drinksByIngredient(value, setterWithLengthCheck);
      case 'name':
        return API.drinksByName(value, setterWithLengthCheck);
      case 'firstLetter':
        return API.drinksByFirstLetter(value, setterWithLengthCheck);
      default:
        break;
      }
    }
  };
  return (
    <form
      onSubmit={ (ev) => {
        ev.preventDefault();
        const { type, value } = ev.target.elements;
        console.log(value);
        if (type.value === 'firstLetter' && value.value.length === 1) {
          filter(type.value, value.value);
        } else if (type.value === 'firstLetter' && value.value.length > 1) {
          alert('Sua busca deve conter somente 1 (um) caracter');
        } else {
          filter(type.value, value.value);
        }
      } }
    >
      <div>
        <input
          type="text"
          name="value"
          placeholder="Buscar Receita"
          data-testid="search-input"
          required
        />
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
      <button type="submit" data-testid="exec-search-btn">
        Buscar
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  type: PropTypes.string.isRequired,
};

export default SearchBar;
