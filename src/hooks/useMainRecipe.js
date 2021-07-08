import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import getMealsOrDrinks from '../helper/mealsOrDrinksMethods';
import { fetchByCategory, fetchList, fetchName } from '../services/data';
import useRecipe from './useRecipe';

const maxList = 4;

export default function useMainRecipe(type) {
  const { recipe, setRecipe, setSearchedByCategory, loading } = useRecipe();
  const { foods, site, foodUpperCase, idFood } = getMealsOrDrinks(type);
  const [category, setCategory] = useState('');
  const [toggleCategory, setToggleCategory] = useState(false);
  const [hasBeenChosenCategory, setHasBeenChosenCategory] = useState(false);

  const fetchAllCategories = async () => {
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
          id={ recp[idFood] }
        />
      ));
    }
  };

  const handleClickCategory = ({ target }) => {
    const { innerText } = target;

    if (innerText === category) {
      setToggleCategory(true);
      setCategory('');
    }

    setCategory(innerText);
    setHasBeenChosenCategory(true);
  };

  useEffect(() => {
    if (toggleCategory) {
      setToggleCategory(false);
      fetchAllCategories();
      console.log('toggleCategory');
    }
  }, [toggleCategory]);

  useEffect(() => {
    if (hasBeenChosenCategory) {
      if (category === 'All') {
        fetchAllCategories();
        setHasBeenChosenCategory(false);
        return;
      }

      if (category) {
        const fetchUpdateRecipe = async () => {
          setSearchedByCategory(true);
          const updateRecipeByCategory = await fetchByCategory(site, category);
          setRecipe({ ...recipe, [foods]: updateRecipeByCategory[foods] });
          setHasBeenChosenCategory(false);
        };

        fetchUpdateRecipe();
      }
    }
  }, [category]);

  useEffect(() => {
    if (!loading) fetchAllCategories();
  }, []);

  return { recipe, setRecipe, renderCards, handleClickCategory, loading };
}
