const searchByIngredient = async (name) => {
  const recipes = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`,
  )
    .then((request) => request.json())
    .then((response) => response.meals);
  return recipes;
};

const searchByName = async (name) => {
  const recipes = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`,
  )
    .then((response) => response.json())
    .then((response) => response.meals);
  return recipes;
};

const searchbyLetter = async (name) => {
  const recipes = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`,
  )
    .then((response) => response.json())
    .then((response) => response.meals);
  return recipes;
};

const SearchFoods = async (type, name) => {
  if (type === 'ingredient') return searchByIngredient(name);

  if (type === 'name') return searchByName(name);

  if (type === 'first-letter') {
    if (name.length === 1) return searchbyLetter(name);

    // eslint-disable-next-line no-alert
    if (name.length > 1) {
      const { alert } = window;
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }
};

export default SearchFoods;
