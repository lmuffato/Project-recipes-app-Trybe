import React, { useEffect, useState } from 'react';
import getDrinkRecipes from '../../../../services/cockTailApi';
import RecipeCard from '../RecipeCard';

function Drink() {
  const [recipes, setRecipes] = useState([]);

  async function getRecipes() {
    const resultArrayLimit = 12;
    const result = await getDrinkRecipes();
    setRecipes(result.drinks.slice(0, resultArrayLimit));
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

export default Drink;
