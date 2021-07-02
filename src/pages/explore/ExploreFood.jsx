import React from 'react';
import ButtonsByType from './components/ButtonsByType';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExploreFood() {
  return (
    <div>
      <Header />
      <ButtonsByType type="comidas" />
      <Footer />
    </div>
  );
}

export default ExploreFood;
