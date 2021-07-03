import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import SearchContext from '../context/SearchContext';

function SearchBar() {
  const { inputText, setInputText,
    inputRadios, setInputRadios,
    getRecipes, getDrinksRecipes } = useContext(SearchContext);
  const location = useLocation();

  const handleRadios = ({ target }) => {
    if (target.checked) setInputRadios(target.id);
  };

  const onClick = () => {
    if (inputRadios === 'first-letter' && inputText.length > 1) {
      window.alert('Sua busca deve conter somente 1 (um) caracter');
    } else if (location.pathname === '/comidas') {
      getRecipes(inputText, inputRadios);
    } else { getDrinksRecipes(inputText, inputRadios); }
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
        onClick={ onClick }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
