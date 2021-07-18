import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import SearchContext from '../context/SearchContext';
import filterClick from '../services/filterClick';

function SearchBar() {
  const { inputText, setInputText,
    inputRadios, setInputRadios,
    getRecipes, getDrinksRecipes } = useContext(SearchContext);
  const location = useLocation();

  const handleRadios = ({ target }) => {
    if (target.checked) setInputRadios(target.id);
  };
  const obj = {
    inputRadios, inputText, location, getRecipes, getDrinksRecipes,
  };

  return (
    <div className="bodyPadding">
      <input
        onChange={ ({ target }) => setInputText(target.value) }
        type="text"
        value={ inputText }
        name="searchText"
        data-testid="search-input"
        placeholder="Buscar receitas"
        className="bodyPadding"
      />
      <label htmlFor="ingredient " className="bodyPadding">
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
      <label htmlFor="name" className="bodyPadding">
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
      <label htmlFor="first-letter" className="bodyPadding">
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
        className="buttonSearch"
        data-testid="exec-search-btn"
        onClick={ () => filterClick(obj) }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
