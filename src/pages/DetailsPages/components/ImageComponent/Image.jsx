import React from 'react';
import PropTypes from 'prop-types';
import { Figure } from 'react-bootstrap';

const Image = ({ recipe }) => (
  <div>
    <Figure.Image
      src={ recipe.strMealThumb }
      data-testid="recipe-photo"
      alt={ recipe.strMeal }
    />
  </div>
);

Image.propTypes = {
  str: PropTypes.string,
}.isRequired;

export default Image;
