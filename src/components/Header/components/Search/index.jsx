import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

function Search({ visibility }) {
  return (
    <form className={ `${styles.search} ${visibility && styles.visible}` }>
      <input type="text" data-testid="search-input" placeholder="Buscar receita" />
      <div className={ styles.options }>
        <label htmlFor="ingredient" data-testid="ingredient-search-radio">
          <input type="radio" name="search-type" id="ingredient" />
          Ingrediente
        </label>
        <label htmlFor="name" data-testid="name-search-radio">
          <input type="radio" name="search-type" id="name" />
          Nome
        </label>
        <label htmlFor="first-letter" data-testid="first-letter-search-radio">
          <input type="radio" name="search-type" id="first-letter" />
          Primeira letra
        </label>
      </div>
      <button
        className="primary-btn"
        type="submit"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </form>
  );
}

Search.propTypes = {
  visibility: PropTypes.string.isRequired,
};

export default Search;
