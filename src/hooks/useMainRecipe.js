import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import getMealsOrDrinks from '../helper/mealsOrDrinksMethods';
import { fetchByCategory, fetchList, fetchName } from '../services/data';
import useRecipe from './useRecipe';

const maxList = 4;

export default function useMainRecipe(type) {
  const { recipe, setRecipe, setSearchedByCategory } = useRecipe();
  const { foods, site, foodUpperCase } = getMealsOrDrinks(type);
  const [category, setCategory] = useState('');

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
    const fetchUpdateRecipe = async () => {
      setSearchedByCategory(true);
      const updateRecipeByCategory = await fetchByCategory(site, category);
      setRecipe({ ...recipe, [foods]: updateRecipeByCategory[foods] });
    };

    if (category) {
      fetchUpdateRecipe();
    }
  }, [category]);

  useEffect(() => {
    const fetchMountRecipe = async () => {
      const responseRecipe = await fetchName(site);
      const responseList = await fetchList(site);

      const filteredList = responseList[foods].reduce((acc, cur, index) => {
        if (index > maxList) return acc;
        const curCategory = cur.strCategory;
        const newAcc = acc.concat(curCategory);
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

  return { recipe, setRecipe, renderCards, setCategory };
}
