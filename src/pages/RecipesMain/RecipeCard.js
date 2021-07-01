import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeCard({ recipe, index }) {
  return (
    <div className="recipe-card" data-testid={ `${index}-recipe-card` }>
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        data-testid={ `${index}-card-img` }
        alt="recipe"
        width="150px"
      />
      <p data-testid={ `${index}-card-name` }>{ recipe.strMeal || recipe.strDrink }</p>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.object,
  index: PropTypes.number,
}.isRequired;
