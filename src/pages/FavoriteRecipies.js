import React from 'react';
import Header from '../components/Header';
import { getLocalStorage } from '../helper';

function FavoriteRecipies() {
  const favRecipes = getLocalStorage('favoriteRecipes');

  return (
    <div>
      <Header title="Receitas Favoritas" />
      Essas receitas são uma delícia mesmo né??
      {favRecipes && favRecipes.map((el, index) => (
        <div key={ index }>TODO favorites</div>
      ))}
    </div>
  );
}

export default FavoriteRecipies;
