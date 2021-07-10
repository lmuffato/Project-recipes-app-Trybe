import { useEffect } from 'react';
import GetDoneDetails from '../services/GetDoneDetails';
// import { getItemFromLocalStorage } from '../services/localStorage';

const setRecipes = async (state, setState) => {
  // const recipes = GetDoneDetails();
  const apiResults = await GetDoneDetails();
  // console.log(apiResults);
  // const data = apiResults.map((item => ({

  // })));
  // const [data] = apiResults;
  // const storage = getItemFromLocalStorage('doneRecipes');
  setState({ ...state, recipes: apiResults, getItems: true });
};

export default function RecipeDone(state, setState) {
  useEffect(() => {
    setRecipes(state, setState);
  }, []);
}
