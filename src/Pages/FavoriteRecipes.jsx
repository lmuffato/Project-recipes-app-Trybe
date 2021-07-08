import React from 'react';
import Header from '../Components/Header';
import RecipesDoneCard from '../Components/RecipesDoneCard';
import FiltersOfDoneRecipes from '../Components/FiltersOfDoneRecipes';
import { FoodContext } from '../Context/FoodProvider';

const FavoriteRecipes = () => {
  const [list, setList] = React.useState([]);
  const { favoriteRecipesFilter } = React.useContext(FoodContext);

  React.useEffect(() => {
    if (!favoriteRecipesFilter) {
      const array = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setList(array);
    } else {
      setList(favoriteRecipesFilter);
    }
  }, [favoriteRecipesFilter]);

  return (
    <>
      <Header page="receitas-favoritas" title="Receitas Favoritas" />
      <FiltersOfDoneRecipes page="favorite" />
      <RecipesDoneCard list={ list } tag={ false } heart />
    </>
  );
};

export default FavoriteRecipes;
