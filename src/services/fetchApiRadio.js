const myAlert = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
export async function fetchByIngredientApi(ingredient, page) {
  const data = await fetch(`https://www.${page}.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const results = await data.json();

  if (results.meals === null || results.drinks === null) {
    alert(myAlert);
  }
  return results.meals || results.drinks;
}
export async function fetchByNameApi(name, page) {
  const data = await fetch(`https://www.${page}.com/api/json/v1/1/search.php?s=${name}`);
  const results = await data.json();
  if (results.meals === null || results.drinks === null) {
    alert(myAlert);
  }
  return results.meals || results.drinks;
}
export async function fetchByFirstLetterApi(firstLetter, page) {
  const data = await fetch(`https://www.${page}.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const results = await data.json();
  if (results.meals === null || results.drinks === null) {
    alert(myAlert);
  }
  return results.meals || results.drinks;
}
