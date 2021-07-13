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
  if (getRecipes && getRecipes[toggle]) {
    const currentRecipe = getRecipes[toggle];
    if (currentRecipe[id]) {
      filtered = currentRecipe[id].includes(ingredient)
        ? currentRecipe[id].filter((item) => item !== ingredient)
        : [...currentRecipe[id], ingredient];
    } else {
      filtered = [ingredient];
    }

    toBeSaved = { ...getRecipes, [toggle]: { ...getRecipes[toggle], [id]: filtered } };
  } else {
    filtered = [ingredient];
    toBeSaved = { ...getRecipes, [toggle]: { [id]: filtered } };
  }
  setDoingRecipes(toBeSaved);
  localStorage.setItem('inProgressRecipes', JSON.stringify(toBeSaved));
};

export const shouldBeChecked = (ingredient, toggle, id) => {
  const getRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (getRecipes) {
    const testKey = getRecipes[toggle];
    if (testKey && testKey[id]) {
      return getRecipes[toggle][id].some((item) => item === ingredient);
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

export const handleLocalProgress = (toggle, id, ingredient) => {
  const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let editedLocal = local;
  if (!toggle || !ingredient || !id) {
    editedLocal = { meals: {}, cocktails: {} };
  }
  if (local) {
    if (local[toggle] && local[toggle][id]) {
      editedLocal = local[toggle][id].includes(ingredient)
        ? { ...local,
          [toggle]: { ...local[toggle][id],
            [id]: local[toggle][id].filter(
              (item) => item !== ingredient,
            ) } }
        : { ...local,
          [toggle]: {
            ...local[toggle],
            [id]: [...local[toggle][id], ingredient] } };
    } else {
      editedLocal = { ...local, [toggle]: { [id]: [ingredient] } };
    }
  } else {
    editedLocal = { meals: {}, cocktails: {} };
  }
  return editedLocal;
};
