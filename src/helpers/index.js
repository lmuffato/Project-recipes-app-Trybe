const checkLocalStorage = (key, recipe, recipeType) => {
  const localFavorites = JSON.parse(localStorage.getItem(key));
  let findFavoriteLocal;
  if (localFavorites) {
    findFavoriteLocal = localFavorites
      .find((fav) => fav.id === recipe[`id${recipeType}`]);
  }
  return findFavoriteLocal;
};

export default checkLocalStorage;
