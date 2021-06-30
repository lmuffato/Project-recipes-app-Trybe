import React from 'react';

import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

import useRecipe from '../hooks/useRecipe';

export default function Foods() {
  const { recipe } = useRecipe();

  return (
    <main>
      <Header title="Comidas" searchIcon />
      {recipe.meals && (
        <div>
          {recipe.meals.map((recp, index) => (
            <RecipeCard
              key={ index }
              index={ index }
              thumb={ recp.strMealThumb }
              title={ recp.strMeal }
            />
          ))}
        </div>
      )}
    </main>
  );
}
