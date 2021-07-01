import React from 'react';
import CategoriesBtn from './components/CategoriesBtn';
import MealCards from './components/MealsPage/MealCards';

function Meals() {
  return (
    <div>
      <CategoriesBtn type="meals" />
      <MealCards />
    </div>
  );
}

export default Meals;
