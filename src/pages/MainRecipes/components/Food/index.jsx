import React, { useEffect, useState } from 'react';
import RecipeCard from '../RecipeCard';
import getFoodRecipes from '../../../../services/mealApi';

function Food() {
  const [recipes, setRecipes] = useState([]);

  async function getRecipes() {
    const mealsArrayLimit = 12;
    const result = await getFoodRecipes();
    setRecipes(result.meals.slice(0, mealsArrayLimit));
  }

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <>
      <h1>Comidas</h1>
      <RecipeCard meals={ recipes } />
    </>
  );
}

export default Food;
