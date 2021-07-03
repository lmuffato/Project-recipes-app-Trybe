import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ButtonExplore from '../../components/ButtonExplore';

function ExploreFoods() {
  return (
    <>
      <Header title="Explorar Comidas" searchBtn={ false } />
      <ButtonExplore type="comidas" />
      <Footer />
    </>
  );
}

export default ExploreFoods;
