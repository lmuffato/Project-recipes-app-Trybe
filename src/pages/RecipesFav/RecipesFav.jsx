import React from 'react';
import Header from '../../components/Header';
import ButtonFilter from './ButtonFilter';
import Recipes from './Recipes';

const RecipesFav = () => (
  <div>
    <Header />
    <ButtonFilter />
    <Recipes />
  </div>
);

export default RecipesFav;
