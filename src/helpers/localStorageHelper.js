const handleSetFavoritesToLocalStorage = (recipeObject) => {
  const favoriteRecipesArr = [];
  const getFavoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (getFavoriteRecipe) {
    const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const setToFavoriteRecipes = [...getFavorites, recipeObject];
    localStorage.setItem('favoriteRecipes', JSON.stringify(setToFavoriteRecipes));
  } else {
    const newFavoriteRecipes = [...favoriteRecipesArr, recipeObject];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  }
};

export default handleSetFavoritesToLocalStorage;
