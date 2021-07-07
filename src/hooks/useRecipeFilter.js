import { useEffect, useState } from 'react';

export default function useRecipeFilter(doneOrFavoritestr, hasBeenChanged = false) {
  const doneOrFavorite = JSON.parse(localStorage.getItem(doneOrFavoritestr));
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
  }, [filter, hasBeenChanged]);

  return { changeValueToFilterRecipes, filteredRecipes };
}
