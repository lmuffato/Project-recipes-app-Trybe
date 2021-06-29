import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function SearchBar({ place }) {
  const [searchState, setState] = useState({
    textInput: '',
    radioInput: '',
    place,
  });

  const handleState = ({ target: { value, name } }) => {
    setState((pastState) => ({
      ...pastState,
      [name]: value,
    }));
  };

  return (
    <div>
      <input
        onChange={ handleState }
        type="text"
        name="textInput"
        value={ searchState.textInput }
        data-testid="search-input"
      />
      <div
        onChange={ handleState }
        value={ searchState.radioInput }
        name="radioInput"
      >
        <label htmlFor="ingredient-search-radio">
          <input data-testid="ingredient-search-radio" type="radio" value="ingredient" />
          Ingrediente
        </label>
        <label htmlFor="name-search-radio">
          <input data-testid="name-search-radio" type="radio" value="name" />
          Nome
        </label>
        <label htmlFor="first-letter-search-radio">
          <input data-testid="first-letter-search-radio" type="radio" value="letter" />
          Primeira letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  place: PropTypes.string.isRequired,
};
