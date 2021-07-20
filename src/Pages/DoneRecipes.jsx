import React from 'react';
import Header from '../Components/Header';
import RecipesDoneCard from '../Components/RecipesDoneCard';
import FiltersOfDoneRecipes from '../Components/FiltersOfDoneRecipes';
import { FoodContext } from '../Context/FoodProvider';

const DoneRecipes = () => {
  const [list, setList] = React.useState([]);
  const { doneRecipesFilter } = React.useContext(FoodContext);

  React.useEffect(() => {
    if (!doneRecipesFilter) {
      const array = JSON.parse(localStorage.getItem('doneRecipes'));
      setList(array);
    } else {
      setList(doneRecipesFilter);
    }
  }, [doneRecipesFilter]);
  return (
    <>
      <Header page="receitas" title="Receitas Feitas" />
      <FiltersOfDoneRecipes page="done" />
      <RecipesDoneCard list={ list } tag heart={ false } />
    </>
  );
};

export default DoneRecipes;
