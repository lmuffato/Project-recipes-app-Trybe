import React from 'react';

import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

import useRecipe from '../hooks/useRecipe';

export default function Foods() {
  const { recipe } = useRecipe();

  const renderCards = () => {
    const maxLengthRecipes = 12;

    if (recipe.meals) {
      const filteredRecipe = recipe.meals.filter(
        (drink, index) => index < maxLengthRecipes,
      );

      return filteredRecipe.map((recp, index) => (
        <RecipeCard
          key={ index }
          index={ index }
          thumb={ recp.strMealThumb }
          title={ recp.strMeal }
        />
      ));
    }
  };

  return (
    <main>
      <Header title="Comidas" searchIcon />
      <div>{renderCards()}</div>
    </main>
  );
}
