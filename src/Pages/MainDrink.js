import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MainDrink() {
  return (
    <>
      <Header props={ { search: true, title: 'Bebidas' } } />
      <Footer />
    </>
  );
}

export default MainDrink;
