import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoodsByIngredients() {
  return (
    <>
      <Header props={ { search: false, title: 'Explorar Ingredientes' } } />
      <Footer />
    </>
  );
}

export default ExploreFoodsByIngredients;
