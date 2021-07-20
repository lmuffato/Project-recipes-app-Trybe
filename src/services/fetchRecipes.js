const fetchRecipes = async (url) => {
  try {
    const recipes = await fetch(url).then((response) => response.json());
    return recipes;
  } catch (err) {
    console.log(err.message);
  }
};

export default fetchRecipes;
