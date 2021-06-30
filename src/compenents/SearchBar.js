import React from 'react';

function SearchBar() {
  return (
    <div>
      <label htmlFor="search-input">
        <input
          type="text"
          data-testid="search-input"
        />
      </label>

      <label htmlFor="filterType">
        Ingrediente
        <input
          type="radio"
          name="filterType"
          data-testid="ingredient-search-radio"
        />
      </label>

      <label htmlFor="filterType">
        Nome
        <input
          type="radio"
          name="filterType"
          data-testid="name-search-radio"
        />
      </label>

      <label htmlFor="filterType">
        Primeira letra
        <input
          type="radio"
          name="filterType"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
