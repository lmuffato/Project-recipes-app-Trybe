import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreButtons from '../components/ExploreButtons';
import './exploreDrinkPage.css';

export default function ExploreDrinks() {
  return (
    <div className="exploreDrinkPage__Container">
      <Header title="Explorar Bebidas">
        <div />
      </Header>

      <ExploreButtons type="bebidas" />

      <Footer />
    </div>
  );
}
