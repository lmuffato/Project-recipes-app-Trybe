import { corba, darkCaipirinha } from './api/onlyOneRecipe';
import firstTwelveRecipes from './api/firstTwelveRecipes';

export const foodDataApi = {
  corba,
  firstTwelve: firstTwelveRecipes.meals,
};

export const drinkDataApi = {
  darkCaipirinha,
  firstTwelve: firstTwelveRecipes.drinks,
};
