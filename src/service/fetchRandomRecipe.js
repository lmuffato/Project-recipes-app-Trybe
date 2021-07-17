export default async function fetchRandomRecipe(recipeType) {
  const siteName = recipeType === 'Meal' ? 'meal' : 'cocktail';
  const randowId = await fetch(`https://www.the${siteName}db.com/api/json/v1/1/random.php`)
    .then((response) => response.json())
    .then((reponse) => reponse[`${recipeType.toLowerCase()}s`][0][`id${recipeType}`]);
  return randowId;
}
