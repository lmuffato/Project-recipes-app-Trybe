import { useEffect, useState } from 'react';
import usePersistedState from './usePersistedState';

export default function useRecipeFilter(doneOrFavoriteStr) {
  const [doneOrFavorite] = usePersistedState(doneOrFavoriteStr, []);
  const [filter, setFilter] = useState('all');
  const [filteredRecipes, setFilteredRecipes] = useState(doneOrFavorite);

  const changeValueToFilterRecipes = ({ target }) => {
    const { name } = target;
    setFilter(name);
  };

  useEffect(() => {
    const changeFilteredRecipes = () => {
      const fixedFilter = filter === 'all' ? '' : filter;
      const newFilteredRecipes = doneOrFavorite
        .filter(({ type }) => type.includes(fixedFilter));
      setFilteredRecipes(newFilteredRecipes);
    };

    changeFilteredRecipes();
  }, [filter]);

  return { changeValueToFilterRecipes, filteredRecipes };
}
