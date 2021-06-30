import React from 'react';
import Header from '../components/Header';

function FavoriteRecepies() {
  return (
    <Header props={ { search: false, title: 'Receitas Favoritas' } } />
  );
}

export default FavoriteRecepies;
