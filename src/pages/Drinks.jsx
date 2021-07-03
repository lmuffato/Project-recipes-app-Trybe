import React from 'react';
import DrinkCards from './components/DrinkPage/DrinkCards';
import CategoriesBtn from './components/CategoriesBtn';
import Header from './components/Header';

function Drinks() {
  return (
    <div>
      <Header type="drinks" />
      <CategoriesBtn type="drinks" />
      <DrinkCards />
    </div>
  );
}

export default Drinks;
