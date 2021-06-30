import React from 'react';
import Header from '../components/Header';

function ExploreFoods() {
  return (
    <Header props={ { search: false, title: 'Explorar Comidas' } } />
  );
}

export default ExploreFoods;
