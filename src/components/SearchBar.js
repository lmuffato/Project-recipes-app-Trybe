import React from 'react';

function SearchBar() {
  return (
    <section>
      <div>
        <label htmlFor="search-input">
          <input data-testid="search-input" />
        </label>
      </div>
      <div>
        <label htmlFor="ingredient">
          Ingrediente
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            name="endpoint"
            value="ingredient"
          />
        </label>
        <label htmlFor="name">
          Nome
          <input
            type="radio"
            data-testid="name-search-radio"
            name="endpoint"
            value="name"
          />
        </label>
        <label htmlFor="first-letter">
          Primeira Letra
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            name="endpoint"
            value="first-letter"
          />
        </label>
      </div>
      <div>
        <button type="button" data-testid="exec-search-btn">
          Buscar
        </button>
      </div>
    </section>
  );
}

export default SearchBar;
