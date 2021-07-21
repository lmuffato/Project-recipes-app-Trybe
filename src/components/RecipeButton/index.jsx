import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const insertNewRecipeProgress = (id) => {
  const { pathname } = window.location;
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (inProgressRecipes) {
    if (pathname.includes('/comidas')) {
      inProgressRecipes.meals = {
        ...inProgressRecipes.meals, [id]: [],
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    } else {
      inProgressRecipes.cocktails = {
        ...inProgressRecipes.cocktails, [id]: [],
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
  }
};

export default function RecipeButton({ path, ingredients }) {
  const { id } = useParams();
  const [buttonName, setButtonName] = useState('Iniciar Receita');
  const [recipeStarted, setStarted] = useState(false);
  const [display, setDisplay] = useState('block');

  // function setLocalStorage() {
  //   const inProgressRecipes = 'inProgressRecipes';
  //   if (localStorage[inProgressRecipes] === undefined) {
  //     const obj = {
  //       cocktails: {
  //       },
  //       meals: {
  //       },
  //     };
  //     localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  //   }
  // }

  function recipesProgress() {
    setStarted(true);
    insertNewRecipeProgress(id);
  }

  const conditionalLocalStorage = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes === null) {
      const obj = {
        cocktails: {},
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    }
  };

  useEffect(() => {
    function button() {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      if (doneRecipes && doneRecipes.find((recipe) => recipe.id === id)) {
        setDisplay('none');
      }
      const include = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (path.includes('/comida')) {
        if (include.meals[id] !== undefined) setButtonName('Continuar Receita');
      } else if (include.cocktails[id] !== undefined) setButtonName('Continuar Receita');
    }
    conditionalLocalStorage();
    button();
  }, [id, path]);

  if (recipeStarted) {
    return (<Redirect
      to={ {
        pathname: `${path}/in-progress`,
        state: { ingredients },
      } }
    />);
  }

  return (
    <button
      className="start-recipe-btn"
      type="button"
      data-testid="start-recipe-btn"
      onClick={ recipesProgress }
      style={ { display } }
    >
      { buttonName }
    </button>
  );
}

RecipeButton.propTypes = {
  ingredients: PropTypes.shape({}).isRequired,
  path: PropTypes.string.isRequired,
}.isRequired;
