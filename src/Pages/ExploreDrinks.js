import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrinks() {
  return (
    <>
      <Header props={ { search: false, title: 'Explorar Bebidas' } } />
      <Footer />
    </>
  );
}

export default ExploreDrinks;
