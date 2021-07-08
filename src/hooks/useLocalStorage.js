import { useContext } from 'react';
import RecipesContext from '../contexts/RecipesContext';

const useLocalStorage = () => {
  const { setFavoriteRecipes, setDoneRecipes } = useContext(RecipesContext) || {};

  const getFavoriteRecipes = () => {
    const storageKey = 'favoriteRecipes';
    const storage = JSON.parse(localStorage.getItem(storageKey)) || [];

    return storage.map(({ id }) => id);
  };

  const getDoneRecipes = () => {
    const storageKey = 'doneRecipes';
    const storage = JSON.parse(localStorage.getItem(storageKey)) || [];
    return storage;
  };

  const updateFavoriteRecipes = (recipe, recipeType) => {
    const recipeInfo = {
      id: recipe[`id${recipeType}`],
      type: recipeType === 'Meal' ? 'comida' : 'bebida',
      area: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe[`str${recipeType}`],
      image: recipe[`str${recipeType}Thumb`],
    };

    const storageKey = 'favoriteRecipes';
    const prevStorage = JSON.parse(localStorage.getItem(storageKey)) || [];
    const isRecipeFavorite = prevStorage
      .find((favRecipe) => favRecipe.id === recipeInfo.id);

    const newStorage = isRecipeFavorite
      ? prevStorage.filter((favRecipe) => favRecipe.id !== recipeInfo.id)
      : [...prevStorage, recipeInfo];

    localStorage.setItem(storageKey, JSON.stringify(newStorage));
    setFavoriteRecipes(getFavoriteRecipes());
  };

  const day = new Date().getDay();
  const mounth = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const date = `${day}/${mounth}/${year}`;

  const updateDoneRecipes = (recipe, recipeType) => {
    const recipeInfo = {
      id: recipe[`id${recipeType}`],
      type: recipeType === 'Meal' ? 'comida' : 'bebida',
      area: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe[`str${recipeType}`],
      tags: [recipe.strTags],
      doneDate: date,
      image: recipe[`str${recipeType}Thumb`],
    };

    const storageKey = 'doneRecipes';
    const prevStorage = JSON.parse(localStorage.getItem(storageKey)) || [];

    localStorage.setItem(storageKey, JSON.stringify([...prevStorage, recipeInfo]));
    setDoneRecipes(getDoneRecipes());
  };

  return { updateFavoriteRecipes, getFavoriteRecipes, updateDoneRecipes };
};

export default useLocalStorage;
