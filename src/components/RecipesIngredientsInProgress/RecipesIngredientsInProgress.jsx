import React, { useState } from 'react';
import PropTypes from 'prop-types';
import formattingMeasuresAndIngredients from '../../services/formatingService';

import Container from './style';
// import { formattingCarouselImgs } from '../../helpers/carouselData';

function RecipeIngredients({ recipe }) {
  const keysAndValues = Object.entries(recipe);

  const [checked, setChecked] = useState([]);

  const formatting = formattingMeasuresAndIngredients(keysAndValues);
  const { ingredients, measures } = formatting;

  const handleChange = ({ target }) => {
    if (target.checked) {
      setChecked([...checked, target.value]);
      target.parentNode.style.textDecoration = 'line-through';
    } else {
      setChecked(checked.filter((check) => check !== target.value));
      target.parentNode.style.textDecoration = 'none';
    }
  };

  return (
    <Container className="ing">
      {ingredients.map((element, index) => (
        <label htmlFor={ element } key={ index }>
          <input
            type="checkbox"
            data-testid={ `${index}-ingredient-step` }
            key={ index }
            id={ element }
            value={ element }
            checked={ checked.includes(element) }
            onChange={ handleChange }
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
