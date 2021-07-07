export default async function searchAreas() {
  const fetched = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const json = await fetched.json();
  const refinedResults = json.meals.map(({ strArea }) => strArea);
  return ['All', ...refinedResults];
}
