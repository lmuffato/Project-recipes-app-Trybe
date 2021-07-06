import React from 'react';
import PropTypes from 'prop-types';

import CardContainer from './styles';
// recommendationCardTestId
// `${index}-recipe-card`
function Card(props) {
  const { recipe, index, titleTestId, cardTestId } = props;
  const recipeName = recipe.strMeal || recipe.strDrink;
  const recipeThumb = recipe.strMealThumb || recipe.strDrinkThumb;

  return (

    <CardContainer>
      <div data-testid={ cardTestId || `${index}-recipe-card` }>
        <div className="img-wrapper">
          <img
            data-testid={ `${index}-card-img` }
            style={ { maxWidth: '100px' } }
            src={ recipeThumb }
            alt="Delicious food/drink"
          />
        </div>
        <div className="card-info">
          <p data-testid={ titleTestId || `${index}-recipe-name` }>{ recipeName }</p>
        </div>
      </div>
    </CardContainer>

  );
}

Card.propTypes = {
  recipe: PropTypes.shape(),
}.isRequired;

export default Card;
