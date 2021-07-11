export const checkLocalStorage = (key, recipe, recipeType) => {
  const localFavorites = JSON.parse(localStorage.getItem(key));
  let findFavoriteLocal;
  if (localFavorites) {
    findFavoriteLocal = localFavorites
      .find((fav) => fav.id === recipe[`id${recipeType}`]);
  }
  return findFavoriteLocal;
};

export const handleProgress = (
  ingredient, doingRecipes, setDoingRecipes, id,
) => {
  const currentRecipe = doingRecipes.find((item) => item.id === id);
  let filtered;
  let newDoings;
  if (currentRecipe) {
    filtered = currentRecipe.ingrd.includes(ingredient)
      ? currentRecipe.ingrd.filter((item) => item !== ingredient)
      : [...currentRecipe.ingrd, ingredient];

    const newObj = { id, ingrd: filtered };
    newDoings = doingRecipes.reduce((acc, cur) => (
      cur.id === id ? [...acc, newObj] : [...acc, cur]), []);
  } else {
    filtered = [ingredient];
    const newObj = { id, ingrd: filtered };
    newDoings = [...doingRecipes, newObj];
  }
  setDoingRecipes(newDoings);
  localStorage.setItem('inProgressRecipes', JSON.stringify(newDoings));
};

export const shouldBeChecked = (ingredient, doingRecipes, id) => {
  const localDoing = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const currentRecipe = doingRecipes.find((item) => item.id === id);
  if (currentRecipe) {
    return currentRecipe.ingrd.includes(ingredient);
  }
  if (localDoing) {
    const currentRecipeLocal = localDoing.find((item) => item.id === id);
    return currentRecipeLocal.ingrd.includes(ingredient);
  }
  return false;
};
