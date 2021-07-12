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
  ingredient, id, toggle, setDoingRecipes,
) => {
  const getRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let filtered;
  let toBeSaved;
  if (getRecipes) {
    const currentRecipe = getRecipes[toggle];
    if (currentRecipe[id]) {
      filtered = currentRecipe[id].includes(ingredient)
        ? currentRecipe[id].filter((item) => item !== ingredient)
        : [...currentRecipe[id], ingredient];
    }

    toBeSaved = { ...getRecipes, [toggle]: { ...getRecipes[toggle], [id]: filtered } };
  } else {
    toBeSaved = { ...getRecipes, [toggle]: { [id]: filtered } };
    filtered = [ingredient];
  }
  setDoingRecipes(toBeSaved);
  localStorage.setItem('inProgressRecipes', JSON.stringify(toBeSaved));
};

export const shouldBeChecked = (ingredient, toggle, id) => {
  const getRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (getRecipes) {
    const testKey = getRecipes[toggle];
    if (testKey && testKey[id]) {
      return getRecipes[toggle][id].includes(ingredient);
    }
  }
  return false;
};

export const createDoneRecipe = (id, recipeType, recipesDetails) => {
  const date = new Date();
  const doneObj = {
    id,
    type: recipeType === 'Meal' ? 'comida' : 'bebida',
    area: recipeType === 'Meal' ? recipesDetails.strArea : '',
    category: recipesDetails.strCategory,
    alcoholicOrNot: recipeType === 'Drink' ? recipesDetails.strAlcoholic : '',
    name: recipesDetails[`str${recipeType}`],
    image: recipesDetails[`str${recipeType}Thumb`],
    doneDate: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
    tags: recipesDetails.strTags ? recipesDetails.strTags.split(',') : '',
  };
  return doneObj;
};

export const createToggles = (pathname) => {
  const recipeType = (pathname.includes('comidas')) ? 'Meal' : 'Drink';
  const toggleApi = (pathname.includes('comidas')) ? 'meals' : 'drinks';
  const toggleCategory = recipeType === 'Meal' ? 'strCategory' : 'strAlcoholic';
  const toggleURL = (pathname.includes('comidas')) ? 'comidas' : 'bebidas';
  const toggleLocalDoing = recipeType === 'Meal' ? 'meals' : 'cocktails';
  return {
    recipeType, toggleApi, toggleCategory, toggleURL, toggleLocalDoing,
  };
};
