import React from 'react';
import DoneFilter from '../components/DoneRecepiesComponents/DoneFilter';
import Header from '../components/Header';
import DoneRecipesCards from '../components/DoneRecepiesComponents/DoneRecipesCards';
import '../styles/DoneRecipes.css';

function receitasFeitas() {
  return (
    <div className="doneRecipesPage">
      <Header title="Done Recipes" displayButton={ false } />
      <DoneFilter />
      <DoneRecipesCards />
    </div>
  );
}
export default receitasFeitas;
