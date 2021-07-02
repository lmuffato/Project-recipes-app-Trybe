import React, { useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import getMealsOrDrinks from '../helper/mealsOrDrinksMethods';
import { fetchName } from '../services/data';
import useRecipe from './useRecipe';

export default function useMainRecipe(type) {
  const { recipe, setRecipe } = useRecipe();
  const { foods, site, foodUpperCase } = getMealsOrDrinks(type);

  const renderCards = () => {
    const maxLengthRecipes = 12;
    if (recipe[foods]) {
      const filteredRecipe = recipe[foods].filter(
        (drink, index) => index < maxLengthRecipes,
      );

      return filteredRecipe.map((recp, index) => (
        <RecipeCard
          key={ index }
          index={ index }
          thumb={ recp[`str${foodUpperCase}Thumb`] }
          title={ recp[`str${foodUpperCase}`] }
        />
      ));
    }
  };

  useEffect(() => {
    const fetchMountRecipe = async () => {
      const responseRecipe = await fetchName(site);
      setRecipe({ ...recipe, [foods]: responseRecipe[foods] });
    };

    fetchMountRecipe();
  }, []);

  return { recipe, setRecipe, renderCards };
}
