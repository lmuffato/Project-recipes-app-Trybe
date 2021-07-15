import React from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';

function Ingredient({ data, index, finishStep }) {
  const { location: { pathname } } = useHistory();
  const recipeIsInProgress = pathname.includes('in-progress');
  if (recipeIsInProgress) {
    return (
      <li
        className={ styles.listOnProgress }
        key={ data }
        data-testid={ `${index}-ingredient-step` }
      >
        <label htmlFor={ data }>
          <input type="checkbox" name="ingredient" id={ data } onClick={ finishStep } />
          <span>
            { data }
          </span>
        </label>
      </li>
    );
  }

  return (
    <li
      key={ data }
      data-testid={ `${index}-ingredient-name-and-measure` }
    >
      { data }
    </li>
  );
}

Ingredient.propTypes = {
  data: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  finishStep: PropTypes.func.isRequired,
};

export default Ingredient;
