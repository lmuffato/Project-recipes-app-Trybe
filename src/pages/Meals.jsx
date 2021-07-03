import React from 'react';
import CategoriesBtn from './components/CategoriesBtn';
import MealCards from './components/MealsPage/MealCards';
import Header from './components/Header';

function Meals() {
  return (
    <div>
      <Header type="meals" />
      <CategoriesBtn type="meals" />
      <MealCards />
    </div>
  );
}

export default Meals;
