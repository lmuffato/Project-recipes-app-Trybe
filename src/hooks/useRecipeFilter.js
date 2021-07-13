import { useEffect, useState } from 'react';
import useRecipe from './useRecipe';

export default function useRecipeFilter(doneOrFavoritestr) {
  const { favoriteRecipes, doneRecipes } = useRecipe();
  const doneOrFavorite = doneOrFavoritestr === 'doneRecipes'
    ? doneRecipes
    : favoriteRecipes;
  const [filter, setFilter] = useState('all');
  const [filtros, setFiltros] = useState('All');
  const [filteredRecipes, setFilteredRecipes] = useState(doneOrFavorite);

  const changeValueToFilterRecipes = ({ target }) => {
    const { name } = target;
    setFilter(name);
    setFiltros(target.innerText);
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

  return { changeValueToFilterRecipes, filteredRecipes, filtros };
}
