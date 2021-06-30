import React from 'react';
import Header from '../components/Header';

function ExploreDrinksByIngredients() {
  return (
    <Header props={ { search: false, title: 'Explorar Ingredientes' } } />
  );
}

export default ExploreDrinksByIngredients;
