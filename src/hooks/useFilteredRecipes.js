import { useContext } from 'react';
import { FilteredRecipesContext } from '../context/FilteredRecipesContext';

export default function useFilteredRecipes() {
  const value = useContext(FilteredRecipesContext);
  return value;
}
