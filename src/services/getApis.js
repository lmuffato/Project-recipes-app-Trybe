export async function fetchRecipes(searchText, radio) {
  let radioLetter;
  switch (radio) {
  case 'ingredient':
    radioLetter = 'filter.php?i';
    break;
  case 'name':
    radioLetter = 'search.php?s';
    break;
  case 'first-letter':
    radioLetter = 'search.php?f';
    break;
  default:
  }
  const edpoint = `https://www.themealdb.com/api/json/v1/1/${radioLetter}=${searchText}`;
  const result = await fetch(edpoint);
  const resultJson = await result.json();
  return resultJson;
}

export async function fetchDrinksRecipes(searchText, radio) {
  let radioLetter;
  switch (radio) {
  case 'ingredient':
    radioLetter = 'filter.php?i';
    break;
  case 'name':
    radioLetter = 'search.php?s';
    break;
  case 'first-letter':
    radioLetter = 'search.php?f';
    break;
  default:
  }
  const edpoint = `https://www.thecocktaildb.com/api/json/v1/1/${radioLetter}=${searchText}`;
  const result = await fetch(edpoint);
  const resultJson = await result.json();
  return resultJson;
}
