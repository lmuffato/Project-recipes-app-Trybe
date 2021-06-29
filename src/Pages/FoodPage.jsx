import React from 'react';
import Header from '../Components/Header';
import FoodList from '../Components/FoodList';

function FoodPage() {
  return (
    <>
      <Header page="themealdb" />
      <h1 data-testid="page-title">Comidas</h1>
      <FoodList />
    </>);
}

export default FoodPage;
