import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../../context/RecipesContext';

export default function SearchBar({ searchActive, path }) {
  const { handleApi } = useContext(RecipesContext);

  const [searchState, setState] = useState({
    textInput: '',
    radioInput: '',
    path,
  });

  const handleState = ({ target: { value, name } }) => {
    setState((pastState) => ({
      ...pastState,
      [name]: value,
    }));
  };

  const handleButton = async () => {
    const { pathname } = window.location;

    if (pathname === '/comidas' || pathname === '/bebidas') {
      handleApi(searchState, 'meal');
    }
  };

  const style = { visibility: `${searchActive ? 'visible' : 'hidden'}` };

  return (
    <div
      className={ `search-bar-container${searchActive ? ' active' : ''}` }
      data-testid="search-bar"
      style={ style }
    >
      <input
        onChange={ handleState }
        type="text"
        name="textInput"
        value={ searchState.textInput }
        data-testid="search-input"
      />
      <div>
        <label htmlFor="ingredient-search-radio">
          <input
            onChange={ handleState }
            name="radioInput"
            data-testid="ingredient-search-radio"
            type="radio"
            value="ingredient"
            checked={ searchState.radioInput === 'ingredient' }
          />
          Ingrediente
        </label>
        <label htmlFor="name-search-radio">
          <input
            onChange={ handleState }
            name="radioInput"
            data-testid="name-search-radio"
            type="radio"
            value="name"
            checked={ searchState.radioInput === 'name' }
          />
          Nome
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            onChange={ handleState }
            name="radioInput"
            data-testid="first-letter-search-radio"
            type="radio"
            value="letter"
            checked={ searchState.radioInput === 'letter' }
          />
          Primeira letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleButton }
      >
        Buscar
      </button>
    </div>
  );
}

SearchBar.defaultProps = {
  path: '',
};

SearchBar.propTypes = {
  path: PropTypes.string,
  searchActive: PropTypes.bool.isRequired,
};
