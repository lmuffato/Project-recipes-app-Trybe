import React from 'react';

export default function SearchBar() {
  return (
    <form>
      <label htmlFor="search-input">
        <input type="text" data-testid="search-input" />
      </label>
      <label htmlFor="search-radio">
        <input
          type="radio"
          name="search-radio"
          data-testid="ingredient-search-radio"
        />
        Nome
        <input type="radio" name="search-radio" data-testid="name-search-radio" />
        Ingrediente
        <input type="radio" name="search-radio" data-testid="first-letter-search-radio" />
        Primeira Letra
      </label>
      <button type="submit" data-testid="exec-search-btn">Buscar</button>
    </form>
  );
}
