import React from 'react';
import {
  Header,
  Footer,
  ExploreButton,
} from '../../../components';

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
