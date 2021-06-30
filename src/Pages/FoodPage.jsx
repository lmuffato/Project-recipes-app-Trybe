import React from 'react';
import Header from '../Components/Header';
import FoodList from '../Components/FoodList';
import Footer from '../Components/Footer';

function FoodPage() {
  return (
    <>
      <Header page="themealdb" title="Comidas" />
      <FoodList />
      <Footer />
    </>);
}

export default FoodPage;
