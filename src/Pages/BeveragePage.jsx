import React from 'react';
import FoodList from '../Components/FoodList';
import Header from '../Components/Header';

function BeveragePage() {
  return (
    <>
      <Header page="thecocktaildb" title="Bebidas" />
      <FoodList />
    </>);
}

export default BeveragePage;
