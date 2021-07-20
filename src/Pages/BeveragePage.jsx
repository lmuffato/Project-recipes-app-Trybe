import React from 'react';
import FoodList from '../Components/FoodList';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ButtonsCategory from '../Components/ButtonsCategory';

function BeveragePage() {
  return (
    <>
      <Header page="thecocktaildb" title="Bebidas" />
      <ButtonsCategory page="thecocktaildb" identifier="drinks" />
      <FoodList page="thecocktaildb" />
      <Footer />
    </>);
}

export default BeveragePage;
