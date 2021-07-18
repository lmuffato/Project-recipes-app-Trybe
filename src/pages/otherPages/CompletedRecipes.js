import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header';
import Context from '../../context/Context';
import CompletedRecipeCardList from '../../components/CompletedRecipeCardList';
import CompletedButtomFilters from '../../components/CompletedButtomFilters';

export default function CompletedRecipes() {
  const { completedFil } = useContext(Context);
  const [list, setList] = useState([]);
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

  useEffect(() => {
    setList(retrivieData());
  }, []);

  const handleSetFilter = () => {
    const data = retrivieData();
    let toReturn = data;
    if (completedFil === 'comida') {
      toReturn = data.filter((ele) => ele.type === 'comida');
      return toReturn;
    }

    if (completedFil === 'bebida') {
      toReturn = data.filter((ele) => ele.type === 'bebida');
      return toReturn;
    }

    if (completedFil === 'All') {
      return toReturn;
    }
  };

  useEffect(() => {
    setList(handleSetFilter());
  }, [completedFil]);

  return (
    <div className="food-page">
      <Header title="Receitas Feitas" show={ false } />
      <CompletedButtomFilters />
      <CompletedRecipeCardList list={ list } />
    </div>
  );
}
