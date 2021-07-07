import { useEffect, useState } from 'react';
import usePersistedState from './usePersistedState';

export default function useRecipeFilter() {
  const [doneRecipes] = usePersistedState('doneRecipes', []);
  const [filter, setFilter] = useState('all');
  const [filteredRecipes, setFilteredRecipes] = useState(doneRecipes);

  const changeValueToFilterRecipes = ({ target }) => {
    const { name } = target;
    setFilter(name);
  };

  useEffect(() => {
    const changeFilteredRecipes = () => {
      const fixedFilter = filter === 'all' ? '' : filter;
      const newFilteredRecipes = doneRecipes
        .filter(({ type }) => type.includes(fixedFilter));

      setFilteredRecipes(newFilteredRecipes);
    };

    changeFilteredRecipes();
  }, [filter]);

  return { changeValueToFilterRecipes, filteredRecipes };
}
