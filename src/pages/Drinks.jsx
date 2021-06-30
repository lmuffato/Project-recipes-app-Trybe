import React from 'react';

import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

import useRecipe from '../hooks/useRecipe';

export default function Drinks() {
  const { recipe } = useRecipe();
  const maxLengthRecipes = 12;
  const filteredRecipe = recipe.drinks.filter(
    (drink, index) => index < maxLengthRecipes,
  );

  return (
    <main>
      <Header title="Bebidas" searchIcon />
      {recipe.drinks && (
        <div>
          {filteredRecipe.map((recp, index) => (
            <RecipeCard
              key={ index }
              index={ index }
              thumb={ recp.strDrinkThumb }
              title={ recp.strDrink }
            />
          ))}
        </div>
      )}
    </main>
  );
}
