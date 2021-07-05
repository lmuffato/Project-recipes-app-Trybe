const getIngredients = (recipe) => {
  const toGet = Object.entries(recipe);
  const ingredients = toGet.filter((key) => key[0].includes('Ingredient')
      && key[1] !== null).map((curr) => curr[1]);
  return ingredients;
};

const getMeasures = (recipe) => {
  const toGet = Object.entries(recipe);
  const measures = toGet.filter((key) => key[0].includes('Measure')
      && key[1] !== null).map((curr) => curr[1]);
  return measures;
};

const setDrinks = (recipes) => {
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
      imgSrc: strDrinkThumb,
      tags: strTags,
      instructions: strInstructions,
      ingredients,
      measures,
    });
  });
  return drinksList;
};

const getDrinks = async () => {
  const endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(endPoint);
  const data = await response.json();
  const { drinks } = data;
  const dataFormat = setDrinks(drinks);
  return dataFormat;
};

export default getDrinks;
