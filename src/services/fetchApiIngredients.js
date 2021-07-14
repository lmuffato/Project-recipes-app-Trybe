export default async function fetchApiIngredients(page) {
  const data = await fetch(`https://www.${page}.com/api/json/v1/1/list.php?i=list`);
  const results = await data.json();

  if (results.meals === null || results.drinks === null) {
    console.log('fail');
  }
  return results.meals || results.drinks;
}
