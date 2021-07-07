import React from 'react';
import PropTypes from 'prop-types';
import ButtonShare from './buttons/ButtonShare';
import FavButton from './buttons/FavButton';

const Heading = ({ recipe }) => (
  <>
    <h4 data-testid="recipe-title">{ recipe.strMeal || recipe.strDrink}</h4>
    <h6 data-testid="recipe-category">{recipe.strAlcoholic || recipe.strCategory}</h6>
    <ButtonShare props={ recipe } />
    <FavButton props={ recipe } />
  </>
);

Heading.propTypes = {
  recipe: PropTypes.object,
}.isRequired;

export default Heading;
