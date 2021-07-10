import React from 'react';
import Proptypes from 'prop-types';
import '../PagesCss/Checkbox.css';

export default function RenderCheckboxIngredients({ ingredients, measure }) {
  const itens = [];
  ingredients.forEach(
    (ingredient, index) => ingredient !== '' && measure[index] !== '' && (
      itens.push(`${ingredient} - ${measure[index]}`)
    ),
  );

  return (
    <>
      {
        itens.map((item, index) => (
          <div key={ item } data-testid={ `${index}-ingredient-step` }>
            <label htmlFor="ingredient">
              {item}
              <input
                name="ingredient"
                // checked={ check }
                // onChange={ () => checked(index) }
                type="checkbox"
              />
            </label>
          </div>
        ))
      }
    </>
  );
}

RenderCheckboxIngredients.propTypes = {
  ingredients: Proptypes.arrayOf(Proptypes.string),
  measure: Proptypes.arrayOf(Proptypes.string),
}.isRequired;
