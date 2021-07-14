import React from 'react';
import PropTypes from 'prop-types';
import ButtonShare from './buttons/ButtonShare';
import FavButton from './buttons/FavButton';

const Heading = ({ recipe }) => (
  <div className="detail-header">
    <div className="title">
      <h4 data-testid="recipe-title">{ recipe.strMeal || recipe.strDrink}</h4>
      <h6 data-testid="recipe-category">{recipe.strAlcoholic || recipe.strCategory}</h6>
    </div>
    <ButtonShare props={ recipe } />
    <FavButton props={ recipe } />
  </div>
);

Heading.propTypes = {
  recipe: PropTypes.object,
}.isRequired;

export default Heading;
