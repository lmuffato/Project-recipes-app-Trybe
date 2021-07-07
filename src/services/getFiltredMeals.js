const setMeals = (recipes) => {
  const mealsList = recipes.map((recipe) => {
    const { idMeal, strMeal, strMealThumb } = recipe;

    return ({
      id: idMeal,
      name: strMeal,
      imgSrc: strMealThumb,
    });
  });
  return mealsList;
};

const getFiltredMeals = async (cat) => {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`;
  const response = await fetch(endPoint);
  const data = await response.json();
  const { meals } = data;
  const toReturn = setMeals(meals);
  return toReturn;
};

export default getFiltredMeals;
