import React from 'react';
import Header from '../Components/Header';

function FoodPage() {
  return (
    <>
      <Header page="themealdb" />
      <h1 data-testid="page-title">Comidas</h1>
    </>);
}

export default FoodPage;
