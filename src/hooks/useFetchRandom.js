export async function fetchRandomFood() {
  const dataFood = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const randomFood = await dataFood.json();
  return randomFood.meals[0].idMeal;
}

export async function fetchRandomDrink() {
  const dataDrink = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const randomDrink = await dataDrink.json();
  return randomDrink.drinks[0].idDrink;
}
