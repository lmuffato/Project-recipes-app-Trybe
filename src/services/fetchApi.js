const fetchRecipes = async (endpoint) => fetch(endpoint)
  .then((response) => response.json());

export default fetchRecipes;
