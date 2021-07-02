import React, { useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import firstLetterUpperCase from '../helper/stringMethods';
import { fetchName } from '../services/data';
import useRecipe from './useRecipe';

export default function useMainRecipe(foods, food) {
  const { recipe, setRecipe } = useRecipe();

  const siteToFetch = food === 'drink' ? 'cocktail' : 'meal';

  const renderCards = () => {
    const maxLengthRecipes = 12;
    if (recipe[foods]) {
      const filteredRecipe = recipe[foods].filter(
        (drink, index) => index < maxLengthRecipes,
      );

      const foodUpperCase = firstLetterUpperCase(food);

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
      const responseRecipe = await fetchName(siteToFetch);
      setRecipe({ ...recipe, [foods]: responseRecipe[foods] });
    };

    fetchMountRecipe();
  }, []);

  return { recipe, setRecipe, renderCards };
}
