import React from 'react';

import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

import useRecipe from '../hooks/useRecipe';

export default function Drinks() {
  const { recipe } = useRecipe();

  const renderCards = () => {
    const maxLengthRecipes = 12;

    if (recipe.drinks) {
      const filteredRecipe = recipe.drinks.filter(
        (drink, index) => index < maxLengthRecipes,
      );

      return filteredRecipe.map((recp, index) => (
        <RecipeCard
          key={ index }
          index={ index }
          thumb={ recp.strDrinkThumb }
          title={ recp.strDrink }
        />
      ));
    }
  };

  return (
    <main>
      <Header title="Bebidas" searchIcon />
      {renderCards()}
    </main>
  );
}
