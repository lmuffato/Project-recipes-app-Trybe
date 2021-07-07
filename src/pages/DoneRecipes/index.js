import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Header from '../../components/Header';
import DoneRecipeCard from '../../components/DoneRecipeCard';

export default function DoneRecipes() {
  document.title = 'Receitas Feitas';
  const [doneRecipes, setDoneRecipes] = useState([]);
  useEffect(() => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);
  return (
    <div>
      <Header />
      <Button name="All" dataTestid="filter-by-all-btn" />
      <Button name="Food" dataTestid="filter-by-food-btn" />
      <Button name="Drinks" dataTestid="filter-by-drink-btn" />
      { doneRecipes.map((recipe, index) => (
        <DoneRecipeCard key={ index } recipe={ recipe } index={ index } />
      )) }
    </div>
  );
}
