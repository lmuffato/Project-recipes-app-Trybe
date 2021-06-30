import { useContext } from 'react';
import { RecipeContext } from '../store/RecipeContext';

export default function useRecipe() {
  const value = useContext(RecipeContext);
  return value;
}
