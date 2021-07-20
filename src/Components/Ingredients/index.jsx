import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import userProvider from '../../context/UserContext';
import { checkLength, handleLocalProgress, shouldBeChecked } from '../../helpers';
import './styles.css';

function Ingredient({ recipe, type, validate = () => ('empty'), id }) {
  const ingredients = Object.entries(recipe)
    .filter((pair) => (
      pair[0].includes('strIngredient') && pair[1]));
  const measures = Object.entries(recipe)
    .filter((pair) => pair[0].includes('strMeasure'));

  const { pathname } = useLocation();
  const toggle = pathname.includes('comida') ? 'meals' : 'cocktails';

  const { setDoingRecipes } = useContext(userProvider);

  const handleClick = ({ target }, ingredient) => {
    if (target.checked) {
      target.parentNode.style.textDecoration = 'line-through';
    } else { target.parentNode.style.textDecoration = ''; }

    setDoingRecipes(handleLocalProgress(toggle, id, ingredient));
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      handleLocalProgress(toggle, id, ingredient),
    ));
  };

  useEffect(() => {
    validate(checkLength(id, toggle, ingredients, validate));
  }, [id, ingredients, ingredients.length, toggle, validate]);

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
                style={
                  shouldBeChecked(`${item[1]}${index}`, toggle, id)
                    ? { textDecoration: 'line-through' }
                    : { textDecoration: 'none' }
                }
              >
                <input
                  id={ `${index}-checkbox` }
                  type="checkbox"
                  className="form-check-input"
                  onClick={ (e) => handleClick(e, `${item[1]}${index}`) }
                  defaultChecked={ shouldBeChecked(
                    `${item[1]}${index}`, toggle, id,
                  ) }
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
