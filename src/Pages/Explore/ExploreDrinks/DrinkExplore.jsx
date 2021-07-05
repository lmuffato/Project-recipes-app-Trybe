import React from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ExploreButton from '../../../components/ExploreButton';

function ExploreDrinks() {
  return (
    <>
      <Header title="Explorar Bebidas" searchBtn={ false } />
      <ExploreButton type="bebidas" />
      <Footer />
    </>
  );
}

export default ExploreDrinks;
