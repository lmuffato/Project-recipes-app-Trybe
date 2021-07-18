import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import UserContext from '../context/UserContext';
import { setToLocalStorage, getItemFromLocalStorage } from '../services/localStorage';
import verifyIfAllIsChecked from '../services/verifyIfAllIsChecked';

function IngredientsCheckboxDrink({ currentMeal, setShowButtonFinished }) {
  const location = useLocation();
  const newLocation = location.pathname.replace('/in-progress', '');
  const idURL = newLocation.replace('/bebidas/', '');
  let initialState = [];
  const local = getItemFromLocalStorage('inProgressRecipes');
  if (local && local.cocktails[idURL]) {
    initialState = local.cocktails[idURL];
  }
  const { globalId, setInProgressStorage, inProgressStorage } = useContext(UserContext);
  const [checkeds, setCheckeds] = useState(initialState);
  const mealObj = Object.entries(currentMeal);
  const ingredientsArray = mealObj.filter((meal) => (
    meal[0].includes('Ingredient') && meal[1]
  ));
  const measureArray = mealObj.filter((meal) => {
    const measure = meal[1] !== ' ' && meal[1] !== null;
    return meal[0].includes('Measure') && measure;
  });

  const handleChange = ({ target }) => {
    const { checked, name } = target;
    if (checked) {
      setCheckeds([
        ...checkeds,
        name,
      ]);
    } else if (!checked) {
      setCheckeds(checkeds.filter((check) => check !== name));
    }
  };

  useEffect(() => {
    if (globalId) {
      setInProgressStorage({
        ...inProgressStorage,
        cocktails: {
          ...inProgressStorage.cocktails,
          [globalId]: checkeds,
        },
      });
    }
  }, [globalId, checkeds]);

  useEffect(() => {
    setToLocalStorage('inProgressRecipes', inProgressStorage);
  }, [inProgressStorage]);

  useEffect(() => {
    verifyIfAllIsChecked(setShowButtonFinished);
  });

  return (
    <div>
      {ingredientsArray.map((ingredient, index) => {
        let isChecked = false;
        if (inProgressStorage.cocktails[idURL]
          && inProgressStorage.cocktails[idURL].includes(ingredient[1])) isChecked = true;
        return (
          <div key={ index } data-testid={ `${index}-ingredient-step` }>
            <label htmlFor={ `${index}-ingredient-step` }>
              <input
                type="checkbox"
                name={ ingredient[1] }
                id={ `${index}-ingredient-step` }
                onChange={ (event) => handleChange(event) }
                checked={ isChecked }
                className="ingredientStep marginCheckbox"
              />
              {measureArray[index] ? (
                `${ingredient[1]} - ${measureArray[index][1]}`
              ) : (ingredient[1])}
            </label>
          </div>
        );
      })}
    </div>
  );
}

IngredientsCheckboxDrink.propTypes = {
  currentMeal: PropTypes.object,
}.isRequired;

export default IngredientsCheckboxDrink;
