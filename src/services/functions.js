import React from 'react';

export const createIngredients = ({ el, position, index }) => {
  const ingredient = el[`strIngredient${position}`];
  const measure = el[`strMeasure${position}`];
  if ((ingredient && measure) !== '' && (ingredient && measure) !== null) {
    return (
      <li data-testid={ `${index}-ingredient-name-and-measure` }>
        {' '}
        { ingredient }
        {' '}
        -
        {' '}
        { measure }
      </li>);
  }
};

export const checkIngredients = ({ el, position, index },
  handler,
  style,
  isChecked = false) => {
  const ingredient = el[`strIngredient${position}`];
  const measure = el[`strMeasure${position}`];
  if ((ingredient && measure) !== '' && (ingredient && measure) !== null) {
    return (
      <div data-testid={ `${index}-ingredient-step` }>
        <input
          type="checkbox"
          id={ `Ingredient${index}` }
          name="ingredients"
          value={ ingredient }
          onChange={ handler }
          { ...isChecked ? { checked: true } : '' }
        />
        <label htmlFor={ `Ingredient${index}` } className={ style }>
          { ` ${ingredient} - ${measure}` }
        </label>
        <br />
      </div>);
  }
};
