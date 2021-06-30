import React from 'react';
import Header from '../components/Header';

function DoneRecepies() {
  return (
    <Header props={ { search: false, title: 'Receitas Feitas' } } />
  );
}

export default DoneRecepies;
