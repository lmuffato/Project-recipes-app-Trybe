import React from 'react';
import Header from '../Components/Header';
import FoodList from '../Components/FoodList';
import Footer from '../Components/Footer';
import ButtonsCategory from '../Components/ButtonsCategory';

function FoodPage() {
  return (
    <>
      <Header page="themealdb" title="Comidas" />
      <ButtonsCategory page="themealdb" identifier="meals" />
      <FoodList page="themealdb" />
      <Footer />
    </>);
}

export default FoodPage;
