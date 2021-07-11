import { useEffect } from 'react';
import GetDoneDetails from '../services/GetDoneDetails';

const setRecipes = async (state, setState) => {
  // time.split(' ')[0]
  // const time = new Date().toLocaleString();
  const apiResults = await GetDoneDetails();
  const data = apiResults && apiResults.map((item) => ({
    id: item.idMeal ? item.idMeal : item.idDrink,
    type: item.idMeal ? 'comida' : 'bebida',
    area: item.strArea ? item.strArea : '',
    category: item.strCategory ? item.strCategory : '',
    alcoholicOrNot: item.idDrink ? item.strAlcoholic : '',
    name: item.strMeal ? item.strMeal : item.strDrink,
    image: item.strMealThumb ? item.strMealThumb : item.strDrinkThumb,
    doneDate: '23/06/2020',
    tags: item.strTags ? item.strTags.split(',') : [''],
  }));
  return setState({ ...state, recipes: data, getItems: true });
};

export default function RecipeDone(state, setState) {
  useEffect(() => {
    setRecipes(state, setState);
  }, []);
}
