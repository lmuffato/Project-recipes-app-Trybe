import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { RecipesContext } from '../../../../context/Recipes';

import styles from './styles.module.scss';

function Search({ visibility }) {
  const { filterRecipe } = useContext(RecipesContext);
  const { location: { pathname } } = useHistory();
  const [filterTyped, setFilterTyped] = useState('');
  const [filterType, setFilterType] = useState('');

  function filter(event) {
    filterRecipe({ type: filterType, content: filterTyped, pathname }, event);
  }

  return (
    <form className={ `${styles.search} ${visibility && styles.visible}` }>
      <input
        type="text"
        data-testid="search-input"
        placeholder="Buscar receita"
        onChange={ ({ target: { value } }) => setFilterTyped(value) }
      />
      <div className={ styles.options }>
        <label htmlFor="ingredient" data-testid="ingredient-search-radio">
          <input
            type="radio"
            name="search-type"
            id="ingredient"
            onChange={ ({ target: { checked, id } }) => setFilterType(checked && id) }
          />
          Ingrediente
        </label>
        <label htmlFor="name" data-testid="name-search-radio">
          <input
            type="radio"
            name="search-type"
            id="name"
            onChange={ ({ target: { checked, id } }) => setFilterType(checked && id) }
          />
          Nome
        </label>
        <label htmlFor="firstletter" data-testid="first-letter-search-radio">
          <input
            type="radio"
            name="search-type"
            id="firstletter"
            onChange={ ({ target: { checked, id } }) => setFilterType(checked && id) }
          />
          Primeira letra
        </label>
      </div>
      <button
        className="primary-btn"
        type="button"
        data-testid="exec-search-btn"
        onClick={ filter }
      >
        Buscar
      </button>
    </form>
  );
}

Search.propTypes = {
  visibility: PropTypes.bool.isRequired,
};

export default Search;
