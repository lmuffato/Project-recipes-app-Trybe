import React from 'react';
import Header from '../components/Header';

function ExploreFoodsByIngredients() {
  return (
    <Header props={ { search: false, title: 'Explorar Ingredientes' } } />
  );
}

export default ExploreFoodsByIngredients;
