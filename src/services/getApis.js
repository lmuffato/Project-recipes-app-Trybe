export default async function fetchRecipes(searchRadio) {
  const edpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchRadio}`;
  const result = await fetch(edpoint);
  const resultJson = await result.json();
  return resultJson;
}
