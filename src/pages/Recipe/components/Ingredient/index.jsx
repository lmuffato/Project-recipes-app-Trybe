import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

function Ingredient({ data, index, recipeCookMode, finishStep }) {
  if (recipeCookMode) {
    return (
      <li className={ styles.listOnProgress } key={ data }>
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
  recipeCookMode: PropTypes.bool.isRequired,
  finishStep: PropTypes.func.isRequired,
};

export default Ingredient;
