const CONTINUAR = 'Continuar Receita';

export function recipeRow(obj) {
  const { donedRecipes, textButton, inProgressRecipes,
    setTextButton, currentMeal } = obj;
  if (donedRecipes && textButton !== '') {
    const findDonedRecipe = donedRecipes.find(({ id }) => {
      const { idMeal } = currentMeal;
      return id === idMeal;
    });
    if (findDonedRecipe) setTextButton('');
  }
  if (inProgressRecipes && textButton !== CONTINUAR && textButton !== '') {
    const findDonedRecipe = inProgressRecipes.find((id) => {
      const { idMeal } = currentMeal;
      return id === idMeal;
    });
    if (findDonedRecipe) setTextButton(CONTINUAR);
  }
}

export function recipeDrinkRow(obj) {
  const { donedRecipes, textButton, inProgressRecipes,
    setTextButton, currentDrink } = obj;
  if (donedRecipes && textButton !== '') {
    const findDonedRecipe = donedRecipes.find(({ id }) => {
      const { idDrink } = currentDrink;
      return id === idDrink;
    });
    if (findDonedRecipe) setTextButton('');
  }
  if (inProgressRecipes && textButton !== CONTINUAR && textButton !== '') {
    const findDonedRecipe = inProgressRecipes.find((id) => {
      const { idDrink } = currentDrink;
      return id === idDrink;
    });
    if (findDonedRecipe) setTextButton(CONTINUAR);
  }
}
