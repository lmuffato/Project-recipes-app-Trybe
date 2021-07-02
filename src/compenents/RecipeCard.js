import React from 'react';
import fetchRecipes from '../services/fetchApi';

function RecipeCard() {
  const getData = async () => {
    await fetchRecipes();
  };

  console.log(getData());

  return (
    <div>
      <p>Opa</p>
    </div>
  );
}

export default RecipeCard;
