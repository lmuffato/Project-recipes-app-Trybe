import { useEffect, useState } from 'react';
import useRecipe from './useRecipe';

export default function useRecipeFilter(doneOrFavoritestr) {
  const { favoriteRecipes, doneRecipes } = useRecipe();
  const doneOrFavorite = doneOrFavoritestr === 'doneRecipes'
    ? doneRecipes
    : favoriteRecipes;
  console.log(doneRecipes);
  const [filter, setFilter] = useState('all');
  const [filteredRecipes, setFilteredRecipes] = useState(doneOrFavorite);

  const changeValueToFilterRecipes = ({ target }) => {
    const { name } = target;
    setFilter(name);
  };

  useEffect(() => {
    const changeFilteredRecipes = () => {
      const fixedFilter = filter === 'all' ? '' : filter;
      const newFilteredRecipes = doneOrFavorite && doneOrFavorite.filter(
        ({ type }) => type.includes(fixedFilter),
      );
      setFilteredRecipes(newFilteredRecipes);
    };

    changeFilteredRecipes();
  }, [filter, doneOrFavorite]);

  return { changeValueToFilterRecipes, filteredRecipes };
}
