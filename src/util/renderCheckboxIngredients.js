import React, { useState } from 'react';
import Proptypes from 'prop-types';
import '../PagesCss/Checkbox.css';

export default function RenderCheckboxIngredients({ ingredients, measure }) {
  const itens = [];
  const aux = [];
  const [checks, setChecks] = useState([]);
  ingredients.forEach(
    (ingredient, index) => ingredient !== '' && measure[index] !== '' && (
      itens.push(`${ingredient} - ${measure[index]}`),
      aux.push(false)
    ),
  );

  const checked = (id) => {
    const newChecks = aux.map((e, index) => index === id && (!e));
    console.log(newChecks);

    setChecks(newChecks);
  };

  return (
    <>
      {
        itens.map((item, index) => (
          <div key={ item } data-testid={ `${index}-ingredient-step` }>
            <label htmlFor="ingredient" className={ checks[index] ? 'risca' : '' }>
              {item}
              <input
                id={ index }
                name="ingredient"
                checked={ checks[index] }
                onChange={ () => checked(index) }
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
