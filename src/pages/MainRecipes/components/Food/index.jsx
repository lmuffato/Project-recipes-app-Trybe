import React, { useEffect, useState } from 'react';
import getMeals from '../../../../services/MealApi';
import RecipeCard from '../RecipeCard';

function Food() {
  const [meals, setMeals] = useState([]);

  async function getAllMeals() {
    const mealsArrayLimit = 12;
    const res = await getMeals();
    setMeals(res.meals.slice(0, mealsArrayLimit));
  }

  useEffect(() => {
    getAllMeals();
  }, []);

  return (
    <>
      <h1>Comidas</h1>
      <RecipeCard meals={ meals } />
    </>
  );
}

export default Food;
