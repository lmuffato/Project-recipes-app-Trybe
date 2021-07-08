import React from 'react';
import PropTypes from 'prop-types';

export default function RecomCard({ recipe }) {
  return (
    <div>
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        data-testid="recipe-photo"
        width="80"
        alt="recipe details"
      />
      <h2 data-testid="recipe-title">
        { recipe.strMeal || recipe.strDrink }
      </h2>
    </div>
  );
}

RecomCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};
