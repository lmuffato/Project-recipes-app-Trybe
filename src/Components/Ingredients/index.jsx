import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

function Ingredient({ recipe, type }) {
  const ingredients = Object.entries(recipe)
    .filter((pair) => pair[0].includes('strIngredient') && pair[1] !== '');
  const mensures = Object.entries(recipe)
    .filter((pair) => pair[0].includes('strMeasure'));

  return (
    <div>
      <h2>Ingredints</h2>
      {
        type === 'list' ? (
          <ul>
            {ingredients.map((item, index) => (
              <li
                key={ `ingredient-${index}` }
                data-testid={ `${0}-ingredient-name-and-measure` }
              >
                {`${item[1]} - ${mensures[index][1]}`}
              </li>
            ))}
          </ul>
        ) : (
          <div>
            { ingredients.map((item, index) => (
              <Form.Check
                key={ `ingredient-${index}` }
                type="checkbox"
                label={ `${item[1]} - ${mensures[index][1]}` }
                data-testid={ `${0}-ingredient-name-and-measure` }
              />
            )) }
          </div>
        )
      }
    </div>
  );
}

Ingredient.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string),
  type: PropTypes.string,
}.isRequired;

export default Ingredient;
