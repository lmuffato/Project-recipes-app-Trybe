import React from 'react';
import Header from '../components/Header';
import FavoriteCards from '../components/FavoriteCards';

function FavoriteRecipes() {
  return (
    <>
      <Header props={ { search: false, title: 'Receitas Favoritas' } } />
      <FavoriteCards />
    </>

  );
}

export default FavoriteRecipes;
