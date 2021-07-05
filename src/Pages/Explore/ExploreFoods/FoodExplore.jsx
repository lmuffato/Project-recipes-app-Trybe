import React from 'react';
import Footer from '../../../components/Footer';
import ExploreButton from '../../../components/ExploreButton';
import Header from '../../../components/Header';

function ExploreFoods() {
  return (
    <>
      <Header title="Explorar Comidas" searchBtn={ false } />
      <ExploreButton type="comidas" />
      <Footer />
    </>
  );
}

export default ExploreFoods;
