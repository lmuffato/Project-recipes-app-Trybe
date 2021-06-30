import React from 'react';
import FoodList from '../Components/FoodList';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function BeveragePage() {
  return (
    <>
      <Header page="thecocktaildb" title="Bebidas" />
      <FoodList />
      <Footer />
    </>);
}

export default BeveragePage;
