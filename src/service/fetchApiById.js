export default async function fetchApiById(typeRecipe, id) {
  const response = await fetch(`https://www.${typeRecipe}.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return typeRecipe === 'themealdb' ? data.meals[0] : data.drinks[0];
}
