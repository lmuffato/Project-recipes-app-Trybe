import React from 'react';
import Header from '../components/Header';

function Explore() {
  return (
    <Header props={ { search: false, title: 'Explorar' } } />
  );
}

export default Explore;
