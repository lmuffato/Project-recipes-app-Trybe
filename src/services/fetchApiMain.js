export function fetchRecipesApi(typeRecipe) {
  return fetch(`https://www.${typeRecipe}.com/api/json/v1/1/search.php?s=`)
    .then((response) => response.json())
    .then((data) => (typeRecipe === 'themealdb' ? data.meals : data.drinks));
}

export function fetchCategoriesApi(typeRecipe) {
  return fetch(`https://www.${typeRecipe}.com/api/json/v1/1/list.php?c=list`)
    .then((response) => response.json())
    .then((data) => (typeRecipe === 'themealdb' ? data.meals : data.drinks));
}

export function fetchByCategoryApi(typeRecipe, category) {
  return fetch(`https://www.${typeRecipe}.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((data) => (typeRecipe === 'themealdb' ? data.meals : data.drinks));
}

export function fetchRandonApi(typeRecipe) {
  return fetch(`https://www.${typeRecipe}.com/api/json/v1/1/random.php`)
    .then((response) => response.json())
    .then((data) => (typeRecipe === 'themealdb' ? data.meals : data.drinks));
}
