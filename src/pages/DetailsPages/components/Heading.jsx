import React from 'react';

const Heading = ({ recipe }) => (
  <>
    <h4 data-testid="recipe-title">{ recipe.strMeal}</h4>
    <h6>{recipe.strCategory}</h6>
  </>
);

export default Heading;
