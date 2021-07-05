import React from 'react';
import Footer from '../../../components/Footer';
import ButtonExplore from '../../../components/ButtonExplore';
import Header from '../../../components/Header';

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
