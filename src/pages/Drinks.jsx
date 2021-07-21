import React from 'react';
import DrinkCards from './components/DrinkPage/DrinkCards';
import CategoriesBtn from './components/CategoriesBtn';
import Header from './components/Header';
import Footer from './components/Footer';

function Drinks() {
  const type = 'drinks';
  return (
    <div className="background">
      <Header type={ type } />
      <CategoriesBtn type={ type } />
      <DrinkCards />
      <Footer />
    </div>
  );
}

export default Drinks;
