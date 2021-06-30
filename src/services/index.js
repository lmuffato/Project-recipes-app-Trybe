export default fetchMealsAndDrinks = (query, type, page) => {
  // endpoints
  const byName = (page === 'meals')
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;
  const byFirstLetter = (page === 'meals')
    ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`
    : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${query}`;
  const byIngredient = (page === 'meals')
    ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`
    : `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;

  let endpoint = '';
  if (type === 'Ingrediente') endpoint = byIngredient;
  if (type === 'Nome') endpoint = byName;
  if (type === 'Primeira letra') endpoint = byFirstLetter;

  const { meals } = fetch(endpoint)
    .then((results) => results.json()
      .then((data) => data));

  return meals;
};
