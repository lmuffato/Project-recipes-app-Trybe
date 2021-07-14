import React from 'react';

const createIngredients = ({ el, position, index }) => {
  const ingredient = el[`strIngredient${position}`];
  const measure = el[`strMeasure${position}`];
  if ((ingredient && measure) !== '' && (ingredient && measure) !== null) {
    return (
      <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
        {' '}
        { ingredient }
        {' '}
        -
        {' '}
        { measure }
      </li>);
  }
};

export default createIngredients;
