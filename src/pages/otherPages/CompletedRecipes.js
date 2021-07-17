import React from 'react';
import Header from '../../components/Header';
import CompletedRecipeCardList from '../../components/CompletedRecipeCardList';
import CompletedButtomFilters from '../../components/CompletedButtomFilters';

export default function CompletedRecipes() {
  const setLocal = () => {
    localStorage.setItem('doneRecipes', JSON.stringify([]));
  };

  const retrivieData = () => {
    const getLocalDone = localStorage.getItem('doneRecipes');
    let doneRecipes = JSON.parse(getLocalDone);
    if (doneRecipes === null) {
      setLocal();
      const getLocalDone2 = localStorage.getItem('doneRecipes');
      doneRecipes = JSON.parse(getLocalDone2);
    }
    return doneRecipes;
  };
  return (
    <div className="food-page">
      <Header title="Receitas Feitas" show={ false } />
      <CompletedButtomFilters />
      <CompletedRecipeCardList list={ retrivieData() } />
    </div>
  );
}
