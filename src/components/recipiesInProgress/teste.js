// import { filter } from "lodash"; 

const comida1 = {
  dateModified: null,
  idMeal: '52977',
  strArea: 'Turkish',
  strCategory: 'Side',
  strCreativeCommonsConfirmed: null,
  strDrinkAlternate: null,
  strImageSource: null,
  strIngredient1: 'Lentils',
  strIngredient2: 'Onion',
  strIngredient3: 'Carrots',
  strIngredient4: 'Tomato Puree',
  strIngredient5: 'Cumin',
  strIngredient6: 'Paprika',
  strIngredient7: 'Mint',
  strIngredient8: 'Thyme',
  strIngredient9: 'Black Pepper',
  strIngredient10: 'Red Pepper Flakes',
  strIngredient11: 'Vegetable Stock',
  strIngredient12: 'Water',
  strIngredient13: 'Sea Salt',
  strIngredient14: '',
  strIngredient15: '',
  strIngredient16: '',
  strIngredient17: '',
  strIngredient18: '',
  strIngredient19: '',
  strIngredient20: '',
  strInstructions: 'Pick through your lentils for any foreign debris, rinse them 2 or 3 times, drain, and set aside.  Fair warning, this will probably turn your lentils into a solid block that you’ll have to break up later\r\nIn a large pot over medium-high heat, sauté the olive oil and the onion with a pinch of salt for about 3 minutes, then add the carrots and cook for another 3 minutes.\r\nAdd the tomato paste and stir it around for around 1 minute. Now add the cumin, paprika, mint, thyme, black pepper, and red pepper as quickly as you can and stir for 10 seconds to bloom the spices. Congratulate yourself on how amazing your house now smells.\r\nImmediately add the lentils, water, broth, and salt. Bring the soup to a (gentle) boil.\r\nAfter it has come to a boil, reduce heat to medium-low, cover the pot halfway, and cook for 15-20 minutes or until the lentils have fallen apart and the carrots are completely cooked.\r\nAfter the soup has cooked and the lentils are tender, blend the soup either in a blender or simply use a hand blender to reach the consistency you desire. Taste for seasoning and add more salt if necessary.\r\nServe with crushed-up crackers, torn up bread, or something else to add some extra thickness.  You could also use a traditional thickener (like cornstarch or flour), but I prefer to add crackers for some texture and saltiness.  Makes great leftovers, stays good in the fridge for about a week.',
  strMeal: 'Corba',
  strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  strMeasure1: '1 cup ',
  strMeasure2: '1 large',
  strMeasure3: '1 large',
  strMeasure4: '1 tbs',
  strMeasure5: '2 tsp',
  strMeasure6: '1 tsp ',
  strMeasure7: '1/2 tsp',
  strMeasure8: '1/2 tsp',
  strMeasure9: '1/4 tsp',
  strMeasure10: '1/4 tsp',
  strMeasure11: '4 cups ',
  strMeasure12: '1 cup ',
  strMeasure13: 'Pinch',
  strMeasure14: ' ',
  strMeasure15: ' ',
  strMeasure16: ' ',
  strMeasure17: ' ',
  strMeasure18: ' ',
  strMeasure19: ' ',
  strMeasure20: ' ',
  strSource: 'https://findingtimeforcooking.com/main-dishes/red-lentil-soup-corba/',
  strTags: 'Soup',
  strYoutube: 'https://www.youtube.com/watch?v=VVnZd8A84z4',
};

const bebida1 = {
  dateModified: '2016-07-18 22:06:00',
  idDrink: '15997',
  strAlcoholic: 'Optional alcohol',
  strCategory: 'Ordinary Drink',
  strCreativeCommonsConfirmed: 'No',
  strDrink: 'GG',
  strDrinkAlternate: null,
  strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  strGlass: 'Collins Glass',
  strIBA: null,
  strImageAttribution: null,
  strImageSource: null,
  strIngredient1: 'Galliano',
  strIngredient2: 'Ginger ale',
  strIngredient3: 'Ice',
  strIngredient4: null,
  strIngredient5: null,
  strIngredient6: null,
  strIngredient7: null,
  strIngredient8: null,
  strIngredient9: null,
  strIngredient10: null,
  strIngredient11: null,
  strIngredient12: null,
  strIngredient13: null,
  strIngredient14: null,
  strIngredient15: null,
  strInstructions: 'Pour the Galliano liqueur over ice. Fill the remainder of the glass with ginger ale and thats all there is to it. You now have a your very own GG.',
  strInstructionsDE: 'Den Galliano-Likör über Eis gießen. Füllen Sie den Rest des Glases mit Ginger Ale und das ist alles, was dazu gehört. Du hast jetzt ein eigenes GG.',
  strInstructionsES: null,
  strInstructionsFR: null,
  strInstructionsIT: 'Versare il liquore Galliano su ghiaccio.\r\nRiempi il resto del bicchiere con ginger ale e questo è tutto.\r\nOra hai il tuo GG personale.',
  'strInstructionsZH-HANS': null,
  'strInstructionsZH-HANT': null,
  strMeasure1: '2 1/2 shots ',
  strMeasure2: null,
  strMeasure3: null,
  strMeasure4: null,
  strMeasure5: null,
  strMeasure6: null,
  strMeasure7: null,
  strMeasure8: null,
  strMeasure9: null,
  strMeasure10: null,
  strMeasure11: null,
  strMeasure12: null,
  strMeasure13: null,
  strMeasure14: null,
  strMeasure15: null,
  strTags: null,
  strVideo: null,
};

const doneRecipes = [{
  id: 'id-da-receita',
  type: 'comida-ou-bebida',
  area: 'area-da-receita-ou-texto-vazio',
  category: 'categoria-da-receita-ou-texto-vazio',
  alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
  name: 'nome-da-receita',
  image: 'imagem-da-receita',
  doneDate: 'quando-a-receita-foi-concluida',
  tags: 'array-de-tags-da-receita-ou-array-vazio',
},];

// const inProgressRecipes = {
//   cocktails: { 'id-da-bebida': ['ingredient1', 'ingrediente2'], },
//   meals: { 'id-da-comida': ['ingredient1', 'ingrediente2'], }
// };

// const inProgressRecipes = { cocktails: '', meals: '' };

// inProgressRecipes.meals = { [comida1.idMeal]: ['bunda'] };
const inProgressRecipes = {
  cocktails: {},
  meals: {
  '52977': [ 'Lentils', 'Onion', 'Carrots','Tomato Puree'],
  '52978': [ 'Lentils', 'Onion', 'Carrots','Tomato Puree'],
  },
};

const receita3 = { '52979': [ 'Lentils', 'Onion', 'Carrots', 'Tomato Puree'] }

// console.log(inProgressRecipes.meals['52977']);
const { cocktails, meals } = inProgressRecipes; // Essencial

// console.log(meals);
// console.log(Object.keys(meals)); // acessa os ids das receitas
// console.log(Object.values(meals)); // acessa o array de ingredientes

// console.log(Object.assign(inProgressRecipes.meals, receita3)); // Inclui receita e atualiza o progresso

// console.log(Object.entries(meals).filter(([key, value]) => key !== '52977')); // Remover item pelo id

// Metodo 1 - Mutação
const removeIngredient = (id, ingredient) => {
  meals[id].splice(meals[id].indexOf(ingredient), 1);
};
// removeIngredient('52977', 'Lentils');

// Atualizar receita através de um array completo da receita
const updateProgressIngredients = (recipeInProgress) => {
  Object.assign(inProgressRecipes.meals, recipeInProgress);
};
const receita4 = { '52979': [ 'Lentils', 'Onion', 'Tomato Puree'] }
updateProgressIngredients(receita4);
updateProgressIngredients(receita3);

console.log(inProgressRecipes);

const person = { name: 'John Doe', email: 'john@doe.com', age: 27 };
console.log(person.omit(person, 'age'));

// meals['52977'].splice(meals['52977'].indexOf('Lentils'), 1) // Remove igrediente pelo nome e id da receita

// console.log(meals);

// const bunda = Object.entries(inProgressRecipes).filter(([key, value]) => key === 'meals');
// console.log(meals);
// console.log(bunda);

// drinks.indexOf('Coffee'); // 2
// const removedDrink = value.splice(value.indexOf('Lentils'),  1);

// const dictionary = { foo: 'bar', baz: 'qux' };
// const object1 = { spam: 'spam' };
// const object2 = { foo: 'spam', baz: 'qux' };
// Object.assign(dictionary, object1);
// const unassign = (target, source) => {
//   Object.keys(source).forEach(key => {
//     delete target[key];
//   });
// };
// unassign(dictionary, object2);
// console.log(dictionary);
