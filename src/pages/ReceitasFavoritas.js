import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ReceitasFavoritasCard from './ReceitasFavoritaCard';

function ReceitasFavoritas() {
  const [favoriteRecipes, setFavoriteRecipes] = useState();

  useEffect(() => {
    const verifyFavorite = () => {
      if (JSON.parse(localStorage.getItem('favoriteRecipes') !== null)) {
        const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

        if (recipes) setFavoriteRecipes(recipes);
      }
    };
    verifyFavorite();
  }, []);

  return favoriteRecipes ? (
    <div>
      <Header title="Receitas Favoritas" />
      { favoriteRecipes
        .map((recipe, index) => {
          const props = {
            recipe,
            index,
          };

          return <ReceitasFavoritasCard key={ index } props={ props } />;
        }) }
    </div>
  ) : <span>Nenhuma receita favoritada</span>;
}

export default ReceitasFavoritas;
