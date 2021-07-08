import React from 'react';
import Header from '../../components/Header';
import ButtonFilter from './ButtonFilter';
import Recipes from './Recipes';
import './index.css';

function RecipesDone() {
  return (
    <>
      <Header />
      <ButtonFilter />
      <Recipes />
    </>
  );
}

export default RecipesDone;
