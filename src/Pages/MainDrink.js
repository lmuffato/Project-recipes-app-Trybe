import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCards from '../components/RecipeCards';

function MainDrink() {
  return (
    <>
      <Header props={ { search: true, title: 'Bebidas' } } />
      <RecipeCards />
      <Footer />
    </>
  );
}

export default MainDrink;
