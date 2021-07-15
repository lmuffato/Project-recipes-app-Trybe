import { corba, darkCaipirinha } from './api/onlyOneRecipe';
import firstTwelveRecipes from './api/firstTwelveRecipes';
import { ingredientsCorba, ingredientsDrink } from './api/ingredients';

export const foodDataApi = {
  corba,
  firstTwelve: firstTwelveRecipes.meals,
  ingredientsCorba,
};

export const drinkDataApi = {
  darkCaipirinha,
  firstTwelve: firstTwelveRecipes.drinks,
  ingredientsDrink,
};
