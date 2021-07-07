export default async function searchFoodByArea(str) {
  const fetched = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${str}`);
  const json = await fetched.json();
  return json.meals;
}
