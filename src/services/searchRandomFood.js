export default async function searchRandomFood() {
  const fetched = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const json = await fetched.json();
  return json.meals[0];
}
