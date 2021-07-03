import React from 'react';
import Header from '../../components/Header';
import ButtonExplore from '../../components/ButtonExplore';
import Footer from '../../components/Footer';

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
