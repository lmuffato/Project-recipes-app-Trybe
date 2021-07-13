export default async function getIngredients(id, objeto, funcion) {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const data = await fetch(URL);
  const response = await data.json();
  const recipe = response.meals[0];

  const keys = Object.keys(recipe);
  const ingredientsName = keys.filter((key) => key.includes(objeto));
  const ingredient = ingredientsName.map((ingred) => {
    const foundIngredient = recipe[ingred];
    return foundIngredient;
  });
  const newIngredients = [];
  ingredient.forEach((ingred) => {
    if (ingred) {
      newIngredients.push(ingred);
    }
  });
  funcion(newIngredients);
}
