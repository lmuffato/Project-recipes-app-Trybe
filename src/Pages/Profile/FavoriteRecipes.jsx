import React, { useEffect, useContext } from 'react';
import context from '../../store/Context';
import { Header } from '../../components';
import RecipeList from '../../components/RecipeList';

function FavoriteRecipes() {
  const { favoriteRecipes, setFavoriteRecipes } = useContext(context);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(items);
  }, [setFavoriteRecipes]);
  return (
    <>
      <Header title="Receitas Favoritas" searchBtn={ false } />
      <RecipeList data={ favoriteRecipes } />
    </>
  );
}

export default FavoriteRecipes;
