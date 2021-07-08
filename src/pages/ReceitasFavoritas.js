import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ReceitasFavoritasCard from './ReceitasFavoritasCard';

function ReceitasFavoritas() {
  const [acctualyRecipes, setAcctualyRecipes] = useState();
  const [favoriteRecipes, setFavoriteRecipes] = useState();

  useEffect(() => {
    const verifyFavorite = () => {
      if (JSON.parse(localStorage.getItem('favoriteRecipes') !== null)) {
        const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

        if (recipes) {
          setFavoriteRecipes(recipes);
          setAcctualyRecipes(recipes);
        }
      }
    };
    verifyFavorite();
  }, []);

  return favoriteRecipes ? (
    <div>
      <Header title="Receitas Favoritas" />

      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ (e) => {
            e.preventDefault();
            setFavoriteRecipes(acctualyRecipes);
          } }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ (e) => {
            e.preventDefault();
            setFavoriteRecipes(acctualyRecipes
              .filter((recipe) => recipe.type === 'comida'));
          } }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ (e) => {
            e.preventDefault();
            setFavoriteRecipes(acctualyRecipes
              .filter((recipe) => recipe.type === 'bebida'));
          } }
        >
          Drinks
        </button>
      </div>

      { favoriteRecipes
        .map((recipe, index) => {
          const props = {
            recipe,
            index,
            setFavoriteRecipes,
          };

          return <ReceitasFavoritasCard key={ index } props={ props } />;
        })}
    </div>
  ) : <span>Nenhuma receita favoritada</span>;
}

export default ReceitasFavoritas;
