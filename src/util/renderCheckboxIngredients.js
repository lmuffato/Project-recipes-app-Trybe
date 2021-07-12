import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import '../PagesCss/Checkbox.css';

export default function RenderCheckboxIngredients({ ingredients, measure }) {
  const [inProgress, setInProgress] = useState();
  const urlType = window.location.href.split('/')[3];

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setInProgress(recipes);
  }, []);

  const updateStorage = (item, checked) => {
    const id = window.location.href.split('/')[4];
    const prevIngr = urlType === 'bebidas'
      ? inProgress.drinks[id].filter((lsItem) => !lsItem.includes(item))
      : inProgress.meals[id].filter((lsItem) => !lsItem.includes(item));
    let addDrink = {};
    if (checked) {
      if (urlType === 'bebidas') {
        addDrink = {
          ...inProgress, drinks: { ...inProgress.drinks, [id]: [...prevIngr, item] },
        };
      } else {
        addDrink = {
          ...inProgress, meals: { ...inProgress.meals, [id]: [...prevIngr, item] },
        };
      }
    }
    if (!checked) {
      if (urlType === 'bebidas') {
        addDrink = {
          ...inProgress, drinks: { ...inProgress.drinks, [id]: prevIngr },
        };
      } else {
        addDrink = {
          ...inProgress, meals: { ...inProgress.meals, [id]: prevIngr },
        };
      }
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(addDrink));
    setInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')));
  };

  const getStorage = (ingredient) => {
    const id = window.location.href.split('/')[4];
    const { drinks } = inProgress;
    const { meals } = inProgress;
    if (urlType === 'bebidas') {
      return drinks[id].includes(ingredient);
    }
    return meals[id].includes(ingredient);
  };

  return (
    <>
      { inProgress && (
        ingredients.map((item, index) => {
          if (item !== '') {
            let name = `${item}`;
            if (measure[index] !== '' && measure[index] !== null) {
              name = `${name} - ${measure[index]}`;
            }
            return (
              <div key={ name }>
                <label htmlFor="ingredient">
                  {name}
                  <input
                    name="ingredient"
                    checked={ getStorage(item) }
                    onChange={ ({ target }) => updateStorage(item, target.checked) }
                    type="checkbox"
                    data-testid={ `${index}-ingredient-step` }
                  />
                </label>
              </div>
            );
          }
          return '';
        })
      )}
      .
    </>
  );
}

RenderCheckboxIngredients.propTypes = {
  ingredients: Proptypes.arrayOf(Proptypes.string),
  measure: Proptypes.arrayOf(Proptypes.string),
}.isRequired;
