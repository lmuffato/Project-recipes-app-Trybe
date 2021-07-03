import React from 'react';
import Header from '../../components/Header';
import ButtonExplore from '../../components/ButtonExplore';
import Footer from '../../components/Footer';

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
