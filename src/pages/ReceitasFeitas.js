import React from 'react';
import DoneFilter from '../components/DoneRecepiesComponents/DoneFilter';
import Header from '../components/Header';
import DoneRecipesCards from '../components/DoneRecepiesComponents/DoneRecipesCards';

function receitasFeitas() {
  return (
    <>
      <Header title="Done Recipes" displayButton={ false } />
      <DoneFilter />
      <DoneRecipesCards />
    </>
  );
}
export default receitasFeitas;
