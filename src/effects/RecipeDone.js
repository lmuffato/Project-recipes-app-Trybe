import { useEffect } from 'react';
import GetDoneDetails from '../services/GetDoneDetails';
import { getItemFromLocalStorage } from '../services/localStorage';

const setRecipes = async (state, setState) => {
  const apiResults = await GetDoneDetails();
  const data = apiResults.map((item) => ({
    id: item.idMeal ? item.idMeal : item.idDrink,
    type: item.idMeal ? 'comida' : 'bebida',
    area: item.strArea ? item.strArea : '',
    category: item.strCategory ? item.strCategory : '',
    alcoholicOrNot: item.alcoholicOrNot ? item.alcoholicOrNot : '',
    name: item.strMeal ? item.strMeal : item.strDrink,
    image: item.strMealThumb ? item.strMealThumb : item.strDrinkThumb,
    doneDate: item.dateModified,
    tags: item.strTags ? item.strTags.split(',') : '',
  }));
  // if (!apiResults.length) {
  //   data = {
  //     id: apiResults.idMeal ? apiResults.idMeal : apiResults.idDrink,
  //     type: apiResults.idMeal ? 'comida' : 'bebida',
  //     area: apiResults.strArea ? apiResults.strArea : '',
  //     category: apiResults.strCategory ? apiResults.strCategory : '',
  //     alcoholicOrNot: apiResults.alcoholicOrNot ? apiResults.alcoholicOrNot : '',
  //     name: apiResults.strMeal ? apiResults.strMeal : apiResults.strDrink,
  //     image: apiResults.strMealThumb ? apiResults.strMealThumb : apiResults.strDrinkThumb,
  //     doneDate: apiResults.dateModified,
  //     tags: apiResults.tags ? apiResults.tags : '',
  //   };
  return setState({ ...state, recipes: data, getItems: true });
};

export default function RecipeDone(state, setState) {
  useEffect(() => {
    setRecipes(state, setState);
  }, []);
}
