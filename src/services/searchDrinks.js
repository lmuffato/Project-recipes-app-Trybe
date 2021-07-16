const searchByIngredient = async (name) => {
  const recipes = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`)
    .then((response) => response.json())
    .then((drinks) => drinks.drinks);
  return recipes;
};

const searchByName = async (name) => {
  const recipes = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => response.json())
    .then((drinks) => drinks.drinks);
  return recipes;
};

const searchByLetter = async (name) => {
  const recipes = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${name}`)
    .then((response) => response.json())
    .then((drinks) => drinks.drinks);
  return recipes;
};

const searchDrinks = async (type, name) => {
  if (type === 'ingredient') return searchByIngredient(name);

  if (type === 'name') return searchByName(name);

  if (type === 'first-letter') {
    if (name.length === 1) return searchByLetter(name);
    if (name.length > 1) {
      const { alert } = window;
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }
};

export default searchDrinks;
