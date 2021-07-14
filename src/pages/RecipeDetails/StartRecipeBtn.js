import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppContext } from '../../context/AppContext';

export default function StartRecipeBtn({ recipe }) {
  const { context } = useContext(AppContext);
  const { pageOrigin, toDoneStorage } = context;

  useEffect(() => {
    if (toDoneStorage && toDoneStorage.some(
      (doneRecipe) => doneRecipe.id === recipe.idMeal || recipe.idDrink,
    )) {
      document.getElementsByClassName('start-recipe-btn')[0].style.display = 'none';
    }

    return () => {
      document.getElementsByClassName('start-recipe-btn')[0].style.display = 'unset';
    };
  }, [toDoneStorage]);

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
          className="start-recipe-btn "
        >
          Iniciar Receita
        </button>
      </Link>
    </div>
  );
}

StartRecipeBtn.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};
