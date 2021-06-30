import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoodByArea() {
  return (
    <>
      <Header props={ { search: true, title: 'Explorar Origem' } } />
      <Footer />
    </>
  );
}

export default ExploreFoodByArea;
