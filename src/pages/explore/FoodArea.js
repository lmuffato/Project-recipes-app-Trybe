import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function FoodArea() {
  return (
    <div>
      <Header title="Explorar Origem" showButton />
      A comida é do:
      <Footer />
    </div>
  );
}

export default FoodArea;
