export default function fetchByIdApi(typeRecipe, recipeId) {
  return fetch(`https://www.${typeRecipe}.com/api/json/v1/1/lookup.php?i=${recipeId}`)
    .then((response) => response.json())
    .then((data) => (typeRecipe === 'themealdb' ? data.meals[0] : data.drinks[0]));
}

/* export default function fetchRecommendations(typeRecipe, recipeId) {
  return fetch(`https://www.${typeRecipe}.com/api/json/v1/1/lookup.php?i=${recipeId}`)
    .then((response) => response.json())
    .then((data) => (typeRecipe === 'themealdb' ? data.meals[0] : data.drinks[0]));
} */