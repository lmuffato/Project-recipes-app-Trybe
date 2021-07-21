import React, { useCallback, useEffect, useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import './Ingredients.css';
import { AppContext } from '../../context/AppContext';

export default function Ingredients({ recipe }) {
  const [textInput, setTextInput] = useState('');
  const [recipeId, setRecipeId] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState('');
  const [fromStorage, setFromStorage] = useState('');
  const { context } = useContext(AppContext);
  const { setCheckedState } = context;
  const key = 'inProgressRecipes';
  const inputRef = useRef(null);
  const resultRef = useRef('');
  const ingredientsRef = useRef('');

  const getFromStorage = useCallback(() => {
    const storageValue = JSON.parse(localStorage.getItem(key)) || {};
    const values = Object.entries(storageValue);
    ingredientsRef.current = [...values];
    const filter = ingredientsRef.current
      .filter((ingredient) => ingredient[0].includes(recipe.idMeal || recipe.idDrink));
    filter.forEach((item) => setFromStorage(item[1]));
  }, [recipe.idMeal, recipe.idDrink]);

  const handleCheckbox = useCallback((() => {
    let checkBoxCounter = 0;
    const inputCheckbox = inputRef.current.querySelectorAll('.checkbox');
    inputCheckbox.forEach((input) => {
      if (input.checked === true) {
        checkBoxCounter += 1;
      } if (checkBoxCounter === inputCheckbox.length) {
        setCheckedState(false);
      }
    });
  }), [setCheckedState]);

  const handleInput = useCallback(({ target }) => {
    handleCheckbox();
    const { name } = target;
    if (target.checked) {
      setTextInput([
        ...textInput,
        name,
      ]);
    }
  }, [textInput, handleCheckbox]);

  const getIngredients = useCallback(() => {
    const ingredients = Object.entries(recipe)
      .filter((property) => property[0].includes('strIngredient') && property[1]);
    setRecipeIngredients(ingredients);
  }, [recipe]);

  const getMeasures = useCallback(() => {
    const measuresList = Object.entries(recipe)
      .filter((property) => {
        const checkKey = property[0].includes('strMeasure');
        const checkValue = property[1];
        return checkKey && checkValue;
      });
    return measuresList;
  }, [recipe]);

  useEffect(() => {
    const toStorage = {
      [recipeId]: [...textInput],
    };
    const storageValue = JSON.parse(localStorage.getItem(key)) || {};
    resultRef.current = { ...storageValue, ...toStorage };
    if (textInput.length > 0) {
      localStorage.setItem(key, JSON.stringify(resultRef.current));
    }
  }, [textInput, recipeId, recipe]);

  useEffect(() => {
    setRecipeId(recipe.idMeal || recipe.idDrink);
  }, [recipeId, recipe.idMeal, recipe.idDrink]);

  useEffect(() => {
    getMeasures();
    getIngredients();
    getFromStorage();
  }, [getFromStorage, getIngredients, getMeasures]);

  return (
    <div ref={ inputRef } className="ingredients">

      {recipeIngredients && recipeIngredients.map(
        (ingredient, index) => (

          <div
            key={ index }
          >
            <label
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ ingredient[1] }

            >
              <input
                className="checkbox"
                id={ ingredient[1] }
                type="checkbox"
                name={ `${ingredient[1]} ` }
                onChange={ handleInput }
                defaultChecked={
                  fromStorage
                   && fromStorage.some((value) => value.includes(ingredient[1]))
                }
              />
              <span>{` ${ingredient[1]} - ${getMeasures()[index][1]}`}</span>
            </label>
            <br />
          </div>
        ),
      )}
    </div>
  );
}

Ingredients.propTypes = {
  recipe: PropTypes.object,
  index: PropTypes.number,
}.isRequired;
