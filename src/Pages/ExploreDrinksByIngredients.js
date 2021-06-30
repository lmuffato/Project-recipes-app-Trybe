import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrinksByIngredients() {
  return (
    <>
      <Header props={ { search: false, title: 'Explorar Ingredientes' } } />
      <Footer />
    </>
  );
}

export default ExploreDrinksByIngredients;
