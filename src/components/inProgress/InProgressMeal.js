import React, { useContext, useEffect } from 'react';
import { getIngredients } from '../../services/getMeals';
import MealShareAndFavorite from '../MealShareAndFavorite';
import Context from '../../context/Context';

export default function InProgressMeal() {
  const { mealsId } = useContext(Context);

  useEffect(() => {
    const mealIngredient = getIngredients(mealsId[0]);

    setIngredients(mealIngredient);
  }, []);

  return (
    <div>
      { mealsId.map((meal, index) => {
        const {
          strMeal,
          strMealThumb,
          strCategory,
          strInstructions,
        } = meal;
        return (
          <div key={ index }>
            <img
              data-testid="recipe-photo"
              src={ strMealThumb }
              alt={ `imagem da comida ${strMeal}` }
            />
            <h1 data-testid="recipe-title">{ strMeal }</h1>
            <MealShareAndFavorite />
            <p data-testid="recipe-category">{ strCategory }</p>
            <p>{ strInstructions }</p>
          </div>
        );
      }) }
    </div>
  );
}
