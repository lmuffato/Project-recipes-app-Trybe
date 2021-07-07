const setDrinks = (recipes) => {
  const drinksList = recipes.map((recipe) => {
    const { idDrink, strDrink, strDrinkThumb } = recipe;

    return ({
      id: idDrink,
      name: strDrink,
      imgSrc: strDrinkThumb,
    });
  });
  return drinksList;
};

const getFiltredDrinks = async (cat) => {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${cat}`;
  const response = await fetch(endPoint);
  const data = await response.json();
  const { drinks } = data;
  const toReturn = setDrinks(drinks);
  return toReturn;
};

export default getFiltredDrinks;
