import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppContext } from '../../context/AppContext';

export default function StartRecipeBtn({ recipe }) {
  const { context } = useContext(AppContext);
  const { pageOrigin, toDoneStorage } = context;

  useEffect(() => {
   /*  const doneRecipes = [
      {
        id: '53013',
        type: 'comida',
        area: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '23/06/2020',
        tags: ['Pasta', 'Curry'],
      },
    ]; */
    // localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes)); // info mockada
    // const savedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    console.log(toDoneStorage);

    if (toDoneStorage && toDoneStorage.some(
      (doneRecipe) => doneRecipe.id === recipe.idMeal || recipe.idDrink,
    )) {
      document.getElementsByClassName('start-recipe-btn')[0].style.display = 'none';
    }
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
