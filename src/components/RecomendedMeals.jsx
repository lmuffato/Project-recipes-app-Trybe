import React, { useEffect, useState } from 'react';
import { fetchRandonMeal } from '../services/getApis';

function RecomendedMeals() {
  const [recomendedMeals, setRecomendedMeals] = useState([]);
  useEffect(() => {
    const MEALS_NUMBER = 6;
    const getRandonDrink = async () => {
      const result = await fetchRandonMeal();
      setRecomendedMeals([...recomendedMeals, result.meals[0]]);
    };
    if (recomendedMeals.length < MEALS_NUMBER) getRandonDrink();
  }, [recomendedMeals]);

  return (
    <div data-testid="0-recomendation-card">
      {recomendedMeals.map((meal, index) => (
        <div key={ index } data-testid={ `${index}-recomendation-card"` }>
          <img src={ meal.strMealThumb } alt="Recomended meal" />
          <h3>{ meal.strMeal }</h3>
        </div>
      ))}
    </div>
  );
}

export default RecomendedMeals;
