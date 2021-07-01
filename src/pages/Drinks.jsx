import React from 'react';
import DrinkCards from './components/DrinkPage/DrinkCards';
import CategoriesBtn from './components/CategoriesBtn';

function Drinks() {
  return (
    <div>
      <CategoriesBtn type="drinks" />
      <DrinkCards />
    </div>
  );
}

export default Drinks;
