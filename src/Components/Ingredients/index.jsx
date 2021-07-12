import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import userProvider from '../../context/UserContext';
import { handleProgress, shouldBeChecked } from '../../helpers';
import './styles.css';

function Ingredient({ recipe, type, validate = () => ('empty'), id }) {
  const ingredients = Object.entries(recipe)
    .filter((pair) => (
      pair[0].includes('strIngredient') && pair[1]));
  const measures = Object.entries(recipe)
    .filter((pair) => pair[0].includes('strMeasure'));

  const { pathname } = useLocation();
  const toggle = pathname.includes('comida') ? 'meals' : 'cocktails';

  const [list, setList] = useState([]);
  const { setDoingRecipes } = useContext(userProvider);

  const handleClick = ({ target }) => {
    if (target.checked) {
      target.parentNode.style.textDecoration = 'line-through';
    } else { target.parentNode.style.textDecoration = ''; }

    setList(
      list.includes(target.parentNode)
        ? list.filter((item) => item !== target.parentNode)
        : [...list, target.parentNode],
    );
    handleProgress(
      target.parentNode.innerText, id, toggle, setDoingRecipes,
    );
  };

  useEffect(() => {
    const finishList = () => {
      if (list.length === ingredients.length) {
        validate(true);
      } else { validate(false); }
    };
    finishList();
  }, [ingredients.length, list.length, validate]);

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
                  checked={ shouldBeChecked(
                    `${item[1]} - ${measures[index][1]}`, toggle, id,
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
