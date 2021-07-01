const fetchRecipes = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  fetch(endpoint)
    .then((response) => response.json())
    .then((respose) => respose);
};

export default fetchRecipes;
