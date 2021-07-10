import { useEffect } from 'react';
import { getItemFromLocalStorage } from '../services/localStorage';

const setRecipes = (state, setState) => {
  const storage = getItemFromLocalStorage('doneRecipes');
  setState({ ...state, recipes: storage, getItems: true });
};

export default function RecipeDone(state, setState) {
  useEffect(() => {
    setRecipes(state, setState);
  }, []);
}
