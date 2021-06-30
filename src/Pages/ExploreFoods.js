import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoods() {
  return (
    <>
      <Header props={ { search: false, title: 'Explorar Comidas' } } />
      <Footer />
    </>
  );
}

export default ExploreFoods;
