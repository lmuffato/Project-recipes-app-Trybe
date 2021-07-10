import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function Ingredient({ recipe, type }) {
  const ingredients = Object.entries(recipe)
    .filter((pair) => (
      pair[0].includes('strIngredient') && pair[1]));
  const measures = Object.entries(recipe)
    .filter((pair) => pair[0].includes('strMeasure'));

  const handleClick = ({ target }) => {
    if (target.checked) {
      target.parentNode.style.textDecoration = 'line-through';
    } else { target.parentNode.style.textDecoration = ''; }
  };

  return (
    <div className="parent">
      <h2>Ingredients</h2>
      {
        type === 'list' ? (
          <ul>
            {ingredients.map((item, index) => (
              <li
                key={ `ingredient-${index}` }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${item[1]} - ${measures[index][1]}`}
              </li>
            ))}
          </ul>
        ) : (
          <div className="checks">
            { ingredients.map((item, index) => (
              <label
                key={ `ingredient-${index}` }
                data-testid={ `${index}-ingredient-step` }
                htmlFor={ `${index}-checkbox` }
              >
                <input
                  id={ `${index}-checkbox` }
                  type="checkbox"
                  className="form-check-input"
                  onClick={ handleClick }
                />
                { `${item[1]} - ${measures[index][1]}` }
              </label>
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
