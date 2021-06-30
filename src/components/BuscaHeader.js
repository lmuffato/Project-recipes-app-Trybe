import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ReceitasContext from '../contexts/ReceitasContext';

function BuscaHeader() {
  const [text, setText] = useState();
  const [type, setType] = useState('name');
  // const [endpoint, setEndpoint] = useState();
  const { fetchApi } = useContext(ReceitasContext);
  const pathName = useHistory().location.pathname;

  function handleClick(event) {
    let endpointIn;
    switch (type) {
    case 'ingredient':
      if (pathName === '/comidas') {
        endpointIn = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`;
      } else {
        endpointIn = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${text}`;
      }
      break;
    case 'firstLetter':
      if (text.length > 1) {
        // eslint-disable-next-line no-alert
        alert('Sua busca deve conter somente 1 (um) caracter');
      }
      if (pathName === '/comidas') {
        endpointIn = `https://www.themealdb.com/api/json/v1/1/search.php?f=${text}`;
      } else {
        endpointIn = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${text}`;
      }
      break;
    case 'name':
      if (pathName === '/comidas') {
        endpointIn = `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`;
      } else {
        endpointIn = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`;
      }
      break;
    default:
      break;
    }
    fetchApi(endpointIn);
    event.preventDefault();
  }

  return (
    <form>
      <input
        data-testid="search-input"
        type="text"
        value={ text }
        onChange={ (event) => setText(event.target.value) }
        required
      />
      <div>
        <label htmlFor="ingredient">
          <input
            type="radio"
            id="ingredient"
            name="select_filter"
            value="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ (event) => setType(event.target.value) }
            required
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            id="name"
            name="select_filter"
            value="name"
            data-testid="name-search-radio"
            onChange={ (event) => setType(event.target.value) }
            required
          />
          Nome
        </label>
        <label htmlFor="firstLetter">
          <input
            type="radio"
            id="firstLetter"
            name="select_filter"
            value="firstLetter"
            data-testid="first-letter-search-radio"
            onChange={ (event) => setType(event.target.value) }
            required
          />
          Primeira letra
        </label>
      </div>
      <button
        type="submit"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </form>
  );
}

export default BuscaHeader;
