export default async function searchIngredient(str) {
  const fetched = await fetch(`https://www.the${str}db.com/api/json/v1/1/list.php?i=list`);
  const json = await fetched.json();
  const key = Object.keys(json)[0];
  if (str === 'meal') {
    const refinedResults = json[key].map(({ strIngredient }) => strIngredient);
    return refinedResults;
  } const refinedResults = json[key].map(({ strIngredient1 }) => strIngredient1);
  return refinedResults;
}
