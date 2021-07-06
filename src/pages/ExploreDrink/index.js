import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ExploreItems from '../../components/ExploreItems';

export default function ExploreDrink() {
  return (
    <div>
      <Header title="Explorar Bebidas" />
      <ExploreItems />
      <Footer />
    </div>
  );
}
