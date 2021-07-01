import React from 'react';

function SearchBar() {
  return (
    <form
      onSubmit={ (ev) => {
        ev.preventDefault();
        setFilters({
          type: ev.target.elements.type.value,
          value: ev.target.elements.value.value,
        });
      } }
    >
      <div>
        <input type="text" name="value" placeholder="Buscar Receita" />
        <label htmlFor="type">
          <label
            htmlFor="ingrediente"
          >
            Ingrediente
            <input
              type="radio"
              name="type"
              id="ingrediente"
              data-testid="ingredient-search-radio"
            />
          </label>
          <label htmlFor="nome">
            Nome
            <input
              type="radio"
              name="type"
              id="nome"
              data-testid="name-search-radio"
            />
          </label>
          <label htmlFor="primeira-letra">
            Primeira letra
            <input
              type="radio"
              name="type"
              id="primeira-letra"
              data-testid="first-letter-search-radio"
            />
          </label>
        </label>
      </div>
      <button type="submit">Buscar</button>
    </form>
  );
}

export default SearchBar;
