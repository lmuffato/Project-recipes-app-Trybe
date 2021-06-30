import React, { useContext } from 'react';
import SearchContext from '../context/SearchContext';

function SearchBar() {
  const { inputText, setInputText,
    inputRadios, setInputRadios } = useContext(SearchContext);

  const handleRadios = ({ target }) => {
    if (target.checked) setInputRadios(target.id);
  };
  return (
    <div>
      <input
        onChange={ ({ target }) => setInputText(target.value) }
        type="text"
        value={ inputText }
        name="searchText"
        data-testid="search-input"
        placeholder="Buscar receitas"
      />
      <label htmlFor="ingredient">
        <input
          type="radio"
          id="ingredient"
          value={ inputRadios }
          name="filter"
          onChange={ handleRadios }
          data-testid="ingredient-search-radio"
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          id="name"
          value={ inputRadios }
          name="filter"
          onChange={ handleRadios }
          data-testid="name-search-radio"
        />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          id="first-letter"
          value={ inputRadios }
          name="filter"
          onChange={ handleRadios }
          data-testid="first-letter-search-radio"
        />
        Primeira letra
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
