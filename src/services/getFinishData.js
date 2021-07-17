import setDate from './getDate';
import { getMealsById, getSmallMealImg } from './getMeals';
import { getDrinksById } from './getDrinks';

const mealsData = async (id) => {
  const data = await getMealsById(id);
  const [{ idMeal, strArea, strCategory, strMeal, strTags }] = data;
  const imgSrc = await getSmallMealImg(strMeal);
  const date = await setDate();
  const obj = {
    id: idMeal,
    type: 'comida',
    area: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: imgSrc,
    doneDate: date,
    tags: strTags,
  };
  return obj;
};

const requestData = async (id, path) => {
  if (path === 'comidas') {
    return mealsData(id);
  }
  if (path === 'bebidas') {
    return getDrinksById(id);
  }
};

export default requestData;
