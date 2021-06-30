export default async function getMeals() {
  const meals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((data) => data.json());
  return meals;
}
