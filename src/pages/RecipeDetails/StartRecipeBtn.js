import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppContext } from '../../context/AppContext';

export default function StartRecipeBtn({ recipe }) {
  const { context } = useContext(AppContext);
  const { pageOrigin, toDoneStorage } = context;
  const [textButton, setTextButton] = useState('');
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

  useEffect(() => {
    const storageValue = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(storageValue);
    if (storageValue && Object.keys(storageValue).some(
      (inProgRecipeID) => (
        inProgRecipeID === recipe.idDrink || inProgRecipeID === recipe.idMeal
      ),
    )) {
      // document.getElementsByClassName(classNameBtn)[0].innerText = 'Continuar Receita';
      setTextButton('Continuar Receita');
    } else {
      // document.getElementsByClassName(classNameBtn)[0].innerText = 'Iniciar Receita';
      setTextButton('Iniciar Receita');
    }
  }, [recipe]);

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
          {/* Iniciar Receita */}
          { console.log(textButton) }
          { textButton }
        </button>
      </Link>
    </div>
  );
}

StartRecipeBtn.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};
