import React from 'react';
import ButtonsByType from './components/ButtonsByType';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExploreDrinks() {
  return (
    <div>
      <Header />
      <ButtonsByType type="bebidas" />
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
