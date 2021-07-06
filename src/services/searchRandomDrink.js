export default async function searchRandomDrink() {
  const fetched = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const json = await fetched.json();
  return json.drinks[0];
}
