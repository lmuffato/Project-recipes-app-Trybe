import React from 'react';
import PropTypes from 'prop-types';

function Card(props) {
  const { recipe, index } = props;
  const recipeName = recipe.strMeal || recipe.strDrink;
  const recipeThumb = recipe.strMealThumb || recipe.strDrinkThumb;

  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        style={ { maxWidth: '100px' } }
        src={ recipeThumb }
        alt="Delicious food/drink"
      />
      <p data-testid={ `${index}-card-name` }>{ recipeName }</p>
    </div>
  );
}

Card.propTypes = {
  recipe: PropTypes.shape(),
}.isRequired;

export default Card;
