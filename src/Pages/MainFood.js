import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCards from '../components/RecipeCards';

function MainFood() {
  return (
    <>
      <Header props={ { search: true, title: 'Comidas' } } />
      <RecipeCards />
      <Footer />
    </>
  );
}

export default MainFood;
