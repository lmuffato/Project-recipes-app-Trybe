import React from 'react';
import Header from '../components/Header';

function MainDrink() {
  return (
    <Header props={ { search: true, title: 'Bebidas' } } />
  );
}

export default MainDrink;
