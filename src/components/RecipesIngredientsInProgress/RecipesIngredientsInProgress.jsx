import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import formattingMeasuresAndIngredients from '../../services/formatingService';

import Container from './style';
import useDetailsProvider from '../../hooks/useDetailsProvider';

function RecipeIngredients({ recipe, type, id }) {
  const keysAndValues = Object.entries(recipe);

  const [checkedBox, setChecked] = useState([]);

  const {
    recipeInProgress,
    setRecipeInProgress,
    setIsDisabled } = useDetailsProvider();

  const formatting = formattingMeasuresAndIngredients(keysAndValues);
  const { ingredients, measures } = formatting;

  const setContextIngredients = useCallback((checkLS) => {
    let currentRecipesInProgress = '';
    if (!checkLS.meals[id] && !checkLS.cocktails[id]) {
      switch (type) {
      case 'meals':
        currentRecipesInProgress = {
          ...checkLS,
          meals: {
            ...checkLS.meals,
            [id]: checkLS.meals[id] ? checkLS.meals[id] : [],
          },
        };
        localStorage.setItem('inProgressRecipes',
          JSON.stringify(currentRecipesInProgress));
        break;
      case 'drinks':
        currentRecipesInProgress = {
          ...checkLS,
          cocktails: {
            ...checkLS.cocktails,
            [id]: checkLS.cocktails[id] ? checkLS.cocktails[id] : [],
          },
        };
        localStorage.setItem('inProgressRecipes',
          JSON.stringify(currentRecipesInProgress));
        break;
      default:
        break;
      }
    }
  }, [id, type]);

  useEffect(() => {
    const getDataFromLocalStorage = () => {
      const localStorageInProgressRecipes = JSON.parse(
        localStorage.getItem('inProgressRecipes'),
      );
      let currentRecipesInProgress = '';
      if (localStorageInProgressRecipes) {
        setContextIngredients(localStorageInProgressRecipes);
      }
      if (!localStorageInProgressRecipes) {
        switch (type) {
        case 'meals':
          currentRecipesInProgress = {
            meals: {
              [id]: [],
            },
            cocktails: {},
          };
          localStorage.setItem('inProgressRecipes',
            JSON.stringify(currentRecipesInProgress));
          break;
        case 'drinks':
          currentRecipesInProgress = {
            cocktails: {
              [id]: [],
            },
            meals: {},
          };
          localStorage.setItem('inProgressRecipes',
            JSON.stringify(currentRecipesInProgress));
          break;
        default:
          break;
        }
      }
    };
    getDataFromLocalStorage();
    setRecipeInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')));
  }, [id, setContextIngredients, setRecipeInProgress, type]);

  const updateRecipesInProgress = (el, isChecked) => {
    const prevIngrAdded = type === 'meals'
      ? recipeInProgress.meals[id].filter((item) => item !== el)
      : recipeInProgress.cocktails[id].filter((item) => item !== el);

    let addingRecipe = {};
    if (isChecked) {
      switch (type) {
      case 'meals':
        addingRecipe = {
          ...recipeInProgress,
          meals: { ...recipeInProgress.meals, [id]: [...prevIngrAdded, el] },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(addingRecipe));
        break;
      case 'drinks':
        addingRecipe = {
          ...recipeInProgress,
          cocktails: { ...recipeInProgress.cocktails, [id]: [...prevIngrAdded, el] },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(addingRecipe));
        break;
      default:
        return addingRecipe;
      }
      setRecipeInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')));
    }
  };

  const handleChange = ({ target }) => {
    if (target.checked) {
      setChecked([...checkedBox, parseInt(target.value, 10)]);
    } else {
      setChecked(checkedBox.filter((check) => check !== parseInt(target.value, 10)));
    }
  };

  useEffect(() => {
    const recipesJson = localStorage.getItem('inProgressRecipes');
    const storageRecipes = JSON.parse(recipesJson);

    if (recipesJson) {
      switch (type) {
      case 'meals':
        if (storageRecipes.meals[id]) {
          setChecked(storageRecipes.meals[id]);
        }
        break;
      case 'drinks':
        if (storageRecipes.cocktails[id]) {
          setChecked(storageRecipes.cocktails[id]);
        }
        break;
      default:
        break;
      }
    }
  }, [id, type]);

  useEffect(() => {
    if (checkedBox.length === ingredients.length) {
      setIsDisabled(false);
    }
  }, [checkedBox.length, ingredients.length, setIsDisabled]);

  return (
    <Container className="ing">
      {recipeInProgress && ingredients.map((element, index) => (
        <label
          htmlFor={ element }
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            key={ index }
            id={ element }
            value={ index }
            checked={ checkedBox.includes(index) }
            onChange={ ({ target }) => {
              updateRecipesInProgress(index, target.checked); handleChange({ target });
            } }
          />
          {measures[index]}
          {' '}
          {element}
        </label>))}
    </Container>
  );
}

export default RecipeIngredients;

RecipeIngredients.propTypes = {
  recipe: PropTypes.shape().isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

// Source (para lógica do Local Storage, uso do spread operator, consultamos o PR abaixo)
// PR https://github.com/tryber/sd-010-a-project-recipes-app/blob/8a57d3eb33863e4702bf5097e2c554bc352fc594/src/util/renderCheckboxIngredients.js#L5
