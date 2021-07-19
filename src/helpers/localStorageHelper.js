import currentDate from './date';

const handleRemoveFavorite = (id, key) => {
  const getLocalStorage = JSON.parse(localStorage.getItem(key));
  const newArrOfRecipes = getLocalStorage.filter((it) => it.id !== id);
  localStorage.setItem(key, JSON.stringify(newArrOfRecipes));
};

const handleSetFavoritesToLocalStorage = (recipe, bool, key, id) => {
  const getLocalStorage = JSON.parse(localStorage.getItem(key));

  if (bool) {
    const checkLocalStorage = getLocalStorage.some((item, index) => {
      if (item.id === id) {
        const recipesArr = getLocalStorage;
        recipesArr[index] = recipe;
        localStorage.setItem(key, JSON.stringify(recipesArr));
      }
      return item.id === id;
    });
    if (!checkLocalStorage) {
      const newArr = [...getLocalStorage, recipe];
      localStorage.setItem(key, JSON.stringify(newArr));
    }
  } else {
    handleRemoveFavorite(id, key);
  }
};

export default handleSetFavoritesToLocalStorage;

export const handleCheckLS = (key, id, type) => {
  const checkLocalStorage = JSON.parse(localStorage.getItem(key));
  if (checkLocalStorage) {
    const recipeId = type === 'meals' ? Object.keys(checkLocalStorage.meals)
      : Object.keys(checkLocalStorage.cocktails);

    if (recipeId) {
      const findId = recipeId.some((item) => item === id);
      if (findId) {
        return findId;
      }
      return false;
    }
    return false;
  }
};

export const handleCheckDoneRecipes = (key, id) => {
  const checkLocalStorage = JSON.parse(localStorage.getItem(key));
  if (checkLocalStorage) {
    const soughtId = checkLocalStorage.some((item) => item.id === id);
    if (soughtId) {
      return soughtId;
    }
    return false;
  }
};

export const handleSetRecipesInProgressToLocalStorage = (key, recipeObjt, type, id) => {
  const getLocalStorage = JSON.parse(localStorage.getItem(key));
  if (getLocalStorage) {
    const recipeId = type === 'meals' ? Object.keys(getLocalStorage.meals)
      : Object.keys(getLocalStorage.cocktails);
    if (recipeId) {
      const checkLocalStorage = getLocalStorage.some((item) => item === id);
      if (checkLocalStorage) {
        return checkLocalStorage;
      }
      if (!checkLocalStorage) {
        const newRecipesObj = { ...getLocalStorage, recipeObjt };
        localStorage.setItem(key, JSON.stringify(newRecipesObj));
      }
    }
  }
};

export const handleDoneRecipesLS = (id, type, singleRecipe) => {
  const doneRecipesObjt = {
    id,
    type: type === 'drinks' ? 'bebida' : 'comida',
    area: singleRecipe.strArea || '',
    category: singleRecipe.strCategory || '',
    alcoholicOrNot: singleRecipe.strAlcoholic || '',
    name: singleRecipe.strMeal || singleRecipe.strDrink,
    image: singleRecipe.strMealThumb || singleRecipe.strDrinkThumb,
    doneDate: currentDate,
    tags: [singleRecipe.strTags],
  };
  const getDoneRecipesFromLS = JSON.parse(localStorage.getItem('doneRecipes'));
  if (getDoneRecipesFromLS) {
    const updateDoneRecipes = [...getDoneRecipesFromLS, doneRecipesObjt];
    localStorage.setItem('doneRecipes', JSON.stringify(updateDoneRecipes));
  }
  if (!getDoneRecipesFromLS) {
    const createDoneRecipesKey = [doneRecipesObjt];
    localStorage.setItem('doneRecipes', JSON.stringify(createDoneRecipesKey));
  }
};
