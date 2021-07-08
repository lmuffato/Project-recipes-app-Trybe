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
