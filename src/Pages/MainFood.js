import React from 'react';
import Header from '../components/Header';

function MainFood() {
  return (
    <Header props={ { search: true, title: 'Comidas' } } />
  );
}

export default MainFood;
