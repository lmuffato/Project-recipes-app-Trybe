import React, { useContext } from 'react';

import RecipeContext from '../context/RecipeContext';
import * as API from '../services/apiRequests';

function SearchBar() {
  const { setRecipes } = useContext(RecipeContext);
  const filter = (type, value) => {
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
export default SearchBar;
