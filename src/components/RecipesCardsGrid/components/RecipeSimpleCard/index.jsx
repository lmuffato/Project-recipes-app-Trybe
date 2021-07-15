import React from 'react';
import PropTypes from 'prop-types';

import plus18Icon from '../../../../images/plus18.svg';

import styles from './styles.module.scss';

function RecipeSimpleCard({ recipe, index, alcoholic, recommendationCard }) {
  return (
    <div
      data-testid={
        recommendationCard ? `${index}-recomendation-card` : `${index}-recipe-card`
      }
      className={ styles.card }
    >
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
        data-testid={
          recommendationCard ? `${index}-recomendation-title` : `${index}-card-name`
        }
        className={ styles.title }
      >
        {recipe.name}
      </span>
    </div>
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
  recommendationCard: PropTypes.bool,
};

RecipeSimpleCard.defaultProps = {
  alcoholic: false,
  recommendationCard: false,
};

export default RecipeSimpleCard;
