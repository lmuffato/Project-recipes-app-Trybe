import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import apiSearch from '../../services/useApiSearch';

export default function SearchBar() {
  const { context } = useContext(AppContext);
  const {
    setSearchValue,
    inputValue,
    setInputValue,
    pageOrigin,
    searchValue,

  } = context;

  function generateRadioButtons(value, label, dataTest) {
    return (
      <label htmlFor="search-radio">
        {label}
        <input
          value={ value }
          name="search-radio"
          onClick={ (ev) => setSearchValue(ev.target.value) }
          type="radio"
          data-testid={ dataTest }
        />
      </label>
    );
  }

  return (
    <>
      <input
        data-testid="search-input"
        type="text"
        value={ inputValue }
        onChange={ (ev) => setInputValue(ev.target.value) }
      />

      {generateRadioButtons('ingredient-search',
        'Ingrediente', 'ingredient-search-radio')}
      {generateRadioButtons('name-search',
        'Nome', 'name-search-radio')}
      {generateRadioButtons('first-letter-search',
        'Primeira letra', 'first-letter-search-radio')}
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ () => apiSearch(searchValue, inputValue, pageOrigin) }
      >
        Buscar

      </button>
    </>
  );
}
