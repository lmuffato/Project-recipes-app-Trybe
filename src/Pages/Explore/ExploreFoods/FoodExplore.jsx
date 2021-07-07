import React from 'react';
import {
  Header,
  Footer,
  ExploreButton,
} from '../../../components';

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
