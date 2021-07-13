export default function fetchDrinksById(id) {
  const drinks = fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json());
  return drinks;
}

export function fetchFoodsById(id) {
  const foods = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json());
  return foods;
}

export function fetchRecommendedDrinks() {
  const min = 0;
  const max = 6;
  const recommended = fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((response) => response.drinks.slice(min, max));
  return recommended;
}

export function fetchRecommendedFoods() {
  const min = 0;
  const max = 6;
  const recommended = fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((response) => response.meals.slice(min, max));
  return recommended;
}
