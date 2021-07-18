import setDate from './getDate';
import { getMealsById } from './getMeals';
import { getDrinksById } from './getDrinks';

const mealsData = async (id) => {
  const data = await getMealsById(id);
  const [{ idMeal, strArea, strCategory, strMeal, strTags, strMealThumb }] = data;
  const date = await setDate();
  const obj = {
    id: idMeal,
    type: 'comida',
    area: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: `${strMealThumb}/preview`,
    doneDate: date,
    tags: strTags.split(','),
  };
  return obj;
};

const drinksData = async (id) => {
  const data = await getDrinksById(id);
  const [{ idDrink, strArea, strCategory,
    strDrink, strTags, strDrinkThumb, strAlcoholic }] = data;
  const date = await setDate();
  const obj = {
    id: idDrink,
    type: 'bebida',
    area: strArea,
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: `${strDrinkThumb}/preview`,
    doneDate: date,
    tags: strTags,
  };
  return obj;
};

const dontDoubleItem = (id, arr) => {
  const toVeirfy = arr.map((ele) => ele.id);
  const condition = toVeirfy.includes(id);
  return !condition;
};

const requestData = async (id, path) => {
  const getLocalDone = localStorage.getItem('doneRecipes');
  let doneRecipes = JSON.parse(getLocalDone);
  if (doneRecipes === null) {
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  }

  const dontDouble = dontDoubleItem(id, doneRecipes);

  let toSet = [];
  if (path === 'comidas' && dontDouble) {
    const data = await mealsData(id);
    toSet = [...doneRecipes, data];
  }
  if (path === 'bebidas' && dontDouble) {
    const data = await drinksData(id);
    toSet = [...doneRecipes, data];
  }
  if (!dontDouble) {
    toSet = [...doneRecipes];
  }
  localStorage.setItem('doneRecipes', JSON.stringify(toSet));
};

export default requestData;
