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

export const setMeals = (recipes) => {
  if (recipes === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  } else {
    const mealsList = recipes.map((recipe) => {
      const {
        idMeal, strMeal, strCategory, strArea,
        strInstructions, strMealThumb, strTags,
      } = recipe;

      const ingredients = getIngredients(recipe);
      const measures = getMeasures(recipe);
      return ({
        id: idMeal,
        name: strMeal,
        category: strCategory,
        from: strArea,
        imgSrc: strMealThumb,
        tags: strTags,
        instructions: strInstructions,
        ingredients,
        measures,
      });
    });
    return mealsList;
  }
  return [];
};
export const getMealsDefault = async () => {
  const endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(endPoint);
  const data = await response.json();
  const { meals } = data;
  const dataFormat = setMeals(meals);
  return dataFormat;
};

export const getMealsByName = async (name) => {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(endPoint);
  const data = await response.json();
  const { meals } = data;
  const dataFormat = setMeals(meals);
  return dataFormat;
};

export const getMealsByIngredient = async (ingredient) => {
  const fetchApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
  );
  const data = await fetchApi.json();
  const { meals } = data;
  const dataFormat = setMeals(meals);
  return dataFormat;
};

export const getMealsByFirstLetter = async (letter) => {
  const fetchApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,
  );
  const data = await fetchApi.json();
  const { meals } = data;
  const dataFormat = setMeals(meals);
  console.log(data);
  return dataFormat;
};

export const getMealsById = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  const { meals } = data;
  return meals;
};

export const getRecomendedMeals = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  const { meals } = data;
  return meals;
};