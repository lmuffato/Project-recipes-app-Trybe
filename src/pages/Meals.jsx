import React from 'react';
import CategoriesBtn from './components/CategoriesBtn';
import MealCards from './components/MealsPage/MealCards';
import Header from './components/Header';
import Footer from './components/Footer';

function Meals() {
  const type = 'meals';
  return (
    <div className="background">
      <Header type={ type } />
      <CategoriesBtn type={ type } />
      <MealCards />
      <Footer />
    </div>
  );
}

export default Meals;
