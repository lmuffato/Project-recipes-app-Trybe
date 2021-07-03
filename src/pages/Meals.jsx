import React from 'react';
import CategoriesBtn from './components/CategoriesBtn';
import MealCards from './components/MealsPage/MealCards';
import RecipesHeader from './components/RecipesHeader';

function Meals() {
  return (
    <div>
      <RecipesHeader />
      <CategoriesBtn type="meals" />
      <MealCards />
    </div>
  );
}

export default Meals;
