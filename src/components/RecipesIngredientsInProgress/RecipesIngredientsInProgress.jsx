import React from 'react';
import PropTypes from 'prop-types';
import formattingMeasuresAndIngredients from '../../services/formatingService';

import Container from './style';
// import { formattingCarouselImgs } from '../../helpers/carouselData';

function RecipeIngredients({ recipe }) {
  const keysAndValues = Object.entries(recipe);

  const formatting = formattingMeasuresAndIngredients(keysAndValues);
  // const imgsFormatted = formattingCarouselImgs(keysAndValues);
  // console.log(imgsFormatted);
  const { ingredients, measures } = formatting;

  return (
    <Container className="ing">
      {ingredients.map((element, index) => (
        <label htmlFor={ element } key={ index }>
          <input
            type="checkbox"
            data-testid={ `${index}-ingredient-step` }
            key={ index }
            id={ element }
          />
          { measures[index]}
          {' '}
          { element }
        </label>))}
    </Container>
  );
}

export default RecipeIngredients;

RecipeIngredients.propTypes = {
  recipe: PropTypes.shape().isRequired,
};
