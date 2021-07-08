import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../context/UserContext';
import { setToLocalStorage, getItemFromLocalStorage } from '../services/localStorage';

function IngredientsCheckBox({ currentMeal }) {
  // let initialChecked = [];
  // const local = getItemFromLocalStorage('inProgressRecipes');
  // if (local) initialChecked = local;
  const [checkeds, setCheckeds] = useState([]);
  const { globalId, setInProgressStorage, inProgressStorage } = useContext(UserContext);
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
        meals: {
          ...inProgressStorage.meals,
          [globalId]: checkeds,
        },
      });
    }
  }, [globalId, checkeds]);

  useEffect(() => {
    setToLocalStorage('inProgressRecipes', inProgressStorage);
    console.log(getItemFromLocalStorage('inProgressRecipes'));
  }, [inProgressStorage]);

  // useEffect(() => {
  //   const key = {
  //     meals: {
  //       [globalId]: checkeds,
  //     },
  //   };
  //   setToLocalStorage('inProgressRecipes', key);
  // }, [globalId, checkeds]);

  return (
    <div>
      {ingredientsArray.map((ingredient, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-step` }>
          <label htmlFor={ `${index}-ingredient-step` }>
            <input
              type="checkbox"
              name={ ingredient[1] }
              id={ `${index}-ingredient-step` }
              onChange={ (event) => handleChange(event) }
            />
            {measureArray[index] ? (
              `${ingredient[1]} - ${measureArray[index][1]}`
            ) : (ingredient[1])}
          </label>
        </div>
      ))}
    </div>
  );
}

IngredientsCheckBox.propTypes = {
  currentMeal: PropTypes.object,
}.isRequired;

export default IngredientsCheckBox;
