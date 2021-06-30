export default async function getFoodRecipes() {
  const recipes = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((data) => data.json());
  return recipes;
}
