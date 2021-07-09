import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

import plus18Icon from '../../../../images/plus18.svg';

import styles from './styles.module.scss';

function RecipeSimpleCard({ recipe, index, alcoholic }) {
  const { location: { pathname } } = useHistory();
  return (
    <Link to={ `${pathname}/${recipe.id}` }>
      <div data-testid={ `${index}-recipe-card` } className={ styles.card }>
        { alcoholic && (
          <span className={ styles.alcoholicTag }>
            <img src={ plus18Icon } alt="18+" />
            Alcoholic
          </span>
        ) }
        <img
          src={ recipe.imagePath }
          alt={ recipe.name }
          data-testid={ `${index}-card-img` }
        />
        <span
          data-testid={ `${index}-card-name` }
          className={ styles.title }
        >
          {recipe.name}
        </span>
      </div>
    </Link>
  );
}

RecipeSimpleCard.propTypes = {
  index: PropTypes.number.isRequired,
  alcoholic: PropTypes.bool,
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    imagePath: PropTypes.string,
  }).isRequired,
};

RecipeSimpleCard.defaultProps = {
  alcoholic: false,
};

export default RecipeSimpleCard;
