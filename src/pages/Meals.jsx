import React from 'react';
import CategoriesBtn from './components/CategoriesBtn';
import MealCards from './components/MealsPage/MealCards';
import Header from './components/Header';
import Footer from './components/Footer';

function Meals() {
  return (
    <div>
      <Header type="meals" />
      <CategoriesBtn type="meals" />
      <MealCards />
      <Footer />
    </div>
  );
}

export default Meals;
