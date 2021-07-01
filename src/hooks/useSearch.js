import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useRecipe from './useRecipe';
import { fetchIngredient, fetchName, fetchFirstLetter } from '../services/data';

export default function useSearch() {
  const { setRecipe, recipe } = useRecipe();

  const [searchResult, setSearchResult] = useState('');
  const [selectedSearch, setSelectedSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const history = useHistory();
  const { pathname } = history.location;

  const recipeKeyName = pathname === '/comidas' ? 'meals' : 'drinks';
  const foods = recipe[recipeKeyName];

  const getRecipe = () => {
    const site = pathname === '/comidas' ? 'meal' : 'cocktail';

    switch (selectedSearch) {
    case 'ingredient':
      return fetchIngredient(site, searchResult);

    case 'name':
      return fetchName(site, searchResult);

    case 'firstLetter':
      if (searchResult.length === 1) {
        return fetchFirstLetter(site, searchResult);
      }
      alert('Sua busca deve conter somente 1 (um) caracter');
      return { meals: [], drinks: [] };

    default:
      return { meals: [], drinks: [] };
    }
  };

  const getSearch = async () => {
    const recipeResponse = await getRecipe();
    setRecipe(recipeResponse);
  };

  const redirectToMealOrDrink = () => {
    const idFood = pathname === '/comidas' ? 'idMeal' : 'idDrink';

    if (foods.length === 1) history.push(`${pathname}/${foods[0][idFood]}`);
  };

  return {
    setSearchResult,
    setSelectedSearch,
    showSearch,
    setShowSearch,
    foods,
    getSearch,
    history,
    redirectToMealOrDrink,
  };
}
