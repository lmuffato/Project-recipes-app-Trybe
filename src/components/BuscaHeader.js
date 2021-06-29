import React, { useState } from 'react';
// import ReceitasContext from '../contexts/ReceitasContext';

function BuscaHeader() {
  const [text, setText] = useState();
  const [type, setType] = useState('name');
  const [endpoint, setEndpoint] = useState();

  function handleClick(event) {
    switch (type) {
    case 'ingredient':
      setEndpoint(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`);
      break;
    case 'firstLetter':
      setEndpoint(`https://www.themealdb.com/api/json/v1/1/filter.php?f=${text}`);
      break;
    case 'name':
      setEndpoint(`https://www.themealdb.com/api/json/v1/1/filter.php?s=${text}`);
      break;
    default:
      break;
    }
    console.log({ text, type, endpoint });
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
