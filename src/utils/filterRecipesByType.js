function filterRecipesByType(recipes, filter) {
  if (filter === 'Food') {
    return recipes.filter((recipe) => recipe.type === 'comida');
  }

  if (filter === 'Drinks') {
    return recipes.filter((recipe) => recipe.type === 'bebida');
  }

  return recipes;
}

export default filterRecipesByType;
