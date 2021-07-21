export const getIngredients = (recipe) => {
  const toGet = Object.entries(recipe);
  const ingredients = toGet.filter((key) => key[0].includes('Ingredient')
    && key[1] !== '' && key[1] !== null).map((curr) => curr[1]);
  return ingredients;
};

export const getMeasures = (recipe) => {
  const toGet = Object.entries(recipe);
  const measures = toGet.filter((key) => key[0].includes('Measure')
    && key[1] !== ' ' && key[1] !== '').map((curr) => curr[1]);
  return measures;
};

export const setDrinks = (recipes) => {
  if (recipes === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  } else {
    const drinksList = recipes.map((recipe) => {
      const {
        idDrink, strDrink, strCategory, strArea,
        strInstructions, strDrinkThumb, strTags,
      } = recipe;
      const ingredients = getIngredients(recipe);
      const measures = getMeasures(recipe);
      return ({
        id: idDrink,
        name: strDrink,
        category: strCategory,
        from: strArea,
        imgSrc: `${strDrinkThumb}/preview`,
        tags: strTags,
        instructions: strInstructions,
        ingredients,
        measures,
      });
    });
    return drinksList;
  }
  return [];
};

export const getDrinks = async () => {
  const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(endPoint);
  const data = await response.json();
  const { drinks } = data;
  const dataFormat = setDrinks(drinks);
  return dataFormat;
};

export const getDrinksByName = async (name) => {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(endPoint);
  const data = await response.json();
  const { drinks } = data;
  const dataFormat = setDrinks(drinks);
  return dataFormat;
};

export const getDrinkByIngredient = async (ingredient) => {
  const fetchApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await fetchApi.json();
  const { drinks } = data;
  const dataFormat = setDrinks(drinks);
  return dataFormat;
};

export const getDrinkByFirstLetter = async (letter) => {
  const fetchApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await fetchApi.json();
  const { drinks } = data;
  const dataFormat = setDrinks(drinks);
  return dataFormat;
};

export const getDrinksById = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  const { drinks } = data;
  return drinks;
};

export const getRecomendedDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  const { drinks } = data;
  return drinks;
};
