import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppContext } from '../../context/AppContext';

export default function StartRecipeBtn({ recipe }) {
  const { context } = useContext(AppContext);
  const { pageOrigin, toDoneStorage } = context;
  const classNameBtn = 'start-recipe-btn';

  useEffect(() => {
    if (toDoneStorage && toDoneStorage.some(
      (doneRecipe) => doneRecipe.id === recipe.idMeal || recipe.idDrink,
    )) {
      document.getElementsByClassName(classNameBtn)[0].style.display = 'none';
    }

    return () => {
      document.getElementsByClassName(classNameBtn)[0].style.display = 'unset';
    };
  }, [toDoneStorage]);

  function checkTextBtn() {
    const storageValue = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(storageValue);
    if (storageValue && (
      Object.keys(storageValue).includes(recipe.idDrink)
      || Object.keys(storageValue).includes(recipe.idMeal)
    )) {
      return 'Continuar Receita';
    }
    return 'Iniciar Receita';
  }

  return (
    <div>
      <Link
        to={ pageOrigin === 'themealdb'
          ? `${recipe.idMeal}/in-progress`
          : `${recipe.idDrink}/in-progress` }

      >
        <button
          type="button"
          data-testid="start-recipe-btn"
          className={ classNameBtn }
        >

          {checkTextBtn()}

        </button>
      </Link>
    </div>
  );
}

StartRecipeBtn.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};
