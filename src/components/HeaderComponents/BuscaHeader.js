import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ReceitasContext from '../../contexts/ReceitasContext';

function BuscaHeader() {
  const [text, setText] = useState();
  const [type, setType] = useState('name');
  const { fetchApi } = useContext(ReceitasContext);
  const pathName = useHistory().location.pathname;

  function handleClick(event) {
    let endpointIn;
    switch (type) {
    case 'ingredient':
      if (pathName === '/comidas') {
        endpointIn = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`;
        fetchApi(endpointIn, 'comidas');
      } else {
        endpointIn = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${text}`;
        fetchApi(endpointIn, 'bebidas');
      }
      break;
    case 'firstLetter':
      if (text.length > 1) {
        // eslint-disable-next-line no-alert
        alert('Sua busca deve conter somente 1 (um) caracter');
      }
      if (pathName === '/comidas') {
        endpointIn = `https://www.themealdb.com/api/json/v1/1/search.php?f=${text}`;
        fetchApi(endpointIn, 'comidas');
      } else {
        endpointIn = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${text}`;
        fetchApi(endpointIn, 'bebidas');
      }
      break;
    case 'name':
      if (pathName === '/comidas') {
        endpointIn = `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`;
        fetchApi(endpointIn, 'comidas');
      } else {
        endpointIn = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`;
        fetchApi(endpointIn, 'bebidas');
      }
      break;
    default:
      break;
    }
    event.preventDefault();
  }

  return (
    <form className="inp-search">
      <div className="inp-group-search">
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
      <div className="group-submit-txt">
        <input
          data-testid="search-input"
          className="inp-txt-search"
          type="text"
          value={ text }
          onChange={ (event) => setText(event.target.value) }
          required
        />
        <div />
        <button
          type="submit"
          className="btn-search-submit"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Filtrar
        </button>
      </div>
    </form>
  );
}

export default BuscaHeader;
