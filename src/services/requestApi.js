export function apiFood(valueInput) {
  const meals = {
    name: `https://www.themealdb.com/api/json/v1/1/search.php?s=${valueInput}`,
    ingrendient: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${valueInput}`,
    firstLetter: `https://www.themealdb.com/api/json/v1/1/search.php?f=${valueInput}`,
  };
  return meals;
}

export function apiDrink(valueInput) {
  const drinks = {
    name: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${valueInput}`,
    ingrendient: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${valueInput}`,
    firstLetter: `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${valueInput}`,
  };
  return drinks;
}

export async function requestApi(endpoint, foodOrDrinkApiName) {
  const numMax = 12;
  const msgErro = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  const api = await fetch(endpoint).then((response) => response.json())
    .catch((err) => {
      console.log(err);
      // eslint-disable-next-line no-alert
      return { [foodOrDrinkApiName]: null };
    });
  console.log(api);
  if (api[foodOrDrinkApiName] === null) {
    // eslint-disable-next-line no-alert
    alert(msgErro);
    return 'error';
  }
  const api12 = api[foodOrDrinkApiName].slice(0, numMax);
  if (api12.length === 1) {
    return 'redirect';
  }
  return api12;
}
