import React, { useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import getMealsOrDrinks from '../helper/mealsOrDrinksMethods';
import { fetchList, fetchName } from '../services/data';
import useRecipe from './useRecipe';

const maxList = 4;

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
      const responseList = await fetchList(site);

      const filteredList = responseList[foods].reduce((acc, cur, index) => {
        if (index > maxList) return acc;
        const category = cur.strCategory;
        const newAcc = acc.concat(category);
        return newAcc;
      }, []);

      setRecipe({
        ...recipe,
        [foods]: responseRecipe[foods],
        list: { ...recipe.list, [foods]: filteredList },
      });
    };

    fetchMountRecipe();
  }, []);

  return { recipe, setRecipe, renderCards };
}
