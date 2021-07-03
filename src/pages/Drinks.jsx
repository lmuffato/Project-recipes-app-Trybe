import React from 'react';
import DrinkCards from './components/DrinkPage/DrinkCards';
import CategoriesBtn from './components/CategoriesBtn';
import RecipesHeader from './components/RecipesHeader';

function Drinks() {
  return (
    <div>
      <RecipesHeader />
      <CategoriesBtn type="drinks" />
      <DrinkCards />
    </div>
  );
}

export default Drinks;
