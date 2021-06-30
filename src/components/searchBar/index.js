import React, { useState } from 'react';
import {
  fetchByIngredientApi,
  fetchByNameApi,
  fetchByFirstLetterApi,
} from '../../services/fetchApiRadio';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  let searchResults = '';
  const length = 1;
  async function getApiSearch() {
    switch (searchValue) {
    case 'ingredient-search':
      searchResults = await fetchByIngredientApi(inputValue);
      console.log(searchResults);
      break;
    case 'name-search':
      searchResults = await fetchByNameApi(inputValue);
      console.log(searchResults);
      break;
    case 'first-letter-search':
      if (inputValue.length > length) {
        alert('Sua busca deve conter somente 1 (um) caracter');
        return;
      }
      searchResults = await fetchByFirstLetterApi(inputValue);
      console.log(searchResults);
      break;

    default:
      return alert('nao encontrado');
    }
  }
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
        onClick={ getApiSearch }
      >
        Buscar

      </button>
    </>
  );
}
