const getMealsOrDrinks = (food) => {
  const foods = food.concat('s');
  const site = food === 'drink' ? 'cocktail' : 'meal';
  const foodUpperCase = food.replace(food[0], food[0].toUpperCase());
  const idFood = food === 'drink' ? 'idDrink' : 'idMeal';
  const portugueseFood = food === 'drink' ? 'bebidas' : 'comidas';
  const typeFood = food === 'drink' ? 'bebida' : 'comida';
  const recommendedSite = food === 'drink' ? 'meal' : 'cocktail';
  return {
    foods,
    site,
    foodUpperCase,
    food,
    idFood,
    portugueseFood,
    recommendedSite,
    typeFood,
  };
};
export default getMealsOrDrinks;
