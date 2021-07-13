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
      return findId;
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
