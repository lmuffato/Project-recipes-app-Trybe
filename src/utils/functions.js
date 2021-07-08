import {
  getFoodsByFirstLetter,
  getFoodsByName,
  getFoodsByIngredients,
  getDinksByName,
  getDrinksByFirstLetter,
  getDrinksByIngredients,
} from '../service/recipesApi';

export function filterMethodFoods(text, ingredients, name, firstLetter) {
  if (ingredients) return { get: getFoodsByIngredients };
  if (name) return { get: getFoodsByName };
  if (firstLetter) {
    const validFirstLetter = text.length !== 1;
    return { get: getFoodsByFirstLetter, validFirstLetter };
  }
  return console.log('Deu ruim');
}

export function filterMethodDrinks(text, ingredients, name, firstLetter) {
  if (ingredients) return { get: getDrinksByIngredients };
  if (name) return { get: getDinksByName };
  if (firstLetter) {
    const validFirstLetter = text.length !== 1;
    return { get: getDrinksByFirstLetter, validFirstLetter };
  }
  return console.log('Deu ruim');
}

export function alertRequestApi() {
  return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
}

export function fetchURLIngredients(ingredients, foodOrDrink) {
  if (foodOrDrink === 'comida') return `https://www.themealdb.com/images/ingredients/${ingredients}-Small.png`;
  return `https://www.thecocktaildb.com/images/ingredients/${ingredients}-Small.png`;
}
