import React from 'react';
import Header from '../Components/Header';
import FoodList from '../Components/FoodList';

function FoodPage() {
  return (
    <>
      <Header page="themealdb" title="Comidas" />
      <FoodList />
    </>);
}

export default FoodPage;
