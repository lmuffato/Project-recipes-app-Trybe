import React from 'react';
import PropTypes from 'prop-types';

export default function RecomCard({ recipe, index }) {
  return (
    <div>
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        data-testid="recipe-photo"
        width="100"
        alt="recipe details"
      />
      <h3 data-testid={ `${index}-recomendation-title` }>
        { recipe.strMeal || recipe.strDrink }
      </h3>
    </div>
  );
}

RecomCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.string.isRequired,
};
