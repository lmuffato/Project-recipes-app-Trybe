import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ButtonExplore from '../../components/ButtonExplore';

function ExploreDrinks() {
  return (
    <>
      <Header title="Explorar Bebidas" searchBtn={ false } />
      <ButtonExplore type="bebidas" />
      <Footer />
    </>
  );
}

export default ExploreDrinks;
