import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ExploreItems from '../../components/ExploreItems';

export default function ExploreFood() {
  return (
    <div>
      <Header title="Explorar Comidas" />
      <ExploreItems />
      <Footer />
    </div>
  );
}
