import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useRecipe from './useRecipe';
import { fetchIngredient, fetchName, fetchFirstLetter } from '../services/data';
import getMealsOrDrinks from '../helper/mealsOrDrinksMethods';

export default function useSearch() {
  const {
    setRecipe, recipe, setSearchedByCategory, searchedByCategory,
  } = useRecipe();

  const history = useHistory();
  const { pathname } = history.location;

  const food = pathname === '/comidas' ? 'meal' : 'drink';
  const { foods, site, idFood } = getMealsOrDrinks(food);

  const [searchResult, setSearchResult] = useState('');
  const [selectedSearch, setSelectedSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const foodsRecipe = recipe[foods];

  const getRecipe = () => {
    switch (selectedSearch) {
    case 'ingredient':
      return fetchIngredient(site, searchResult);

    case 'name':
      return fetchName(site, searchResult);

    case 'firstLetter':
      if (searchResult.length === 1) {
        return fetchFirstLetter(site, searchResult);
      }
      global.alert('Sua busca deve conter somente 1 (um) caracter');
      return { meals: [], drinks: [] };

    default:
      return { meals: [], drinks: [] };
    }
  };

  const getSearch = async () => {
    setSearchedByCategory(false);
    const responseRecipe = await getRecipe();
    setRecipe({ ...recipe, [foods]: responseRecipe[foods] });
  };

  const redirectToMealOrDrink = () => {
    if (foodsRecipe.length === 1 && !searchedByCategory) {
      history.push(`${pathname}/${foodsRecipe[0][idFood]}`);
    }
  };

  return {
    setSearchResult,
    setSelectedSearch,
    showSearch,
    setShowSearch,
    foodsRecipe,
    getSearch,
    history,
    redirectToMealOrDrink,
  };
}
