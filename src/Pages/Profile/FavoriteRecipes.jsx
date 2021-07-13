import React, { useEffect, useState } from 'react';
import { Header } from '../../components';
import RecipeList from '../../components/RecipeList';

function FavoriteRecipes() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setData(items);
  }, []);
  return (
    <>
      <Header title="Receitas Favoritas" searchBtn={ false } />
      <RecipeList data={ data } />
    </>
  );
}

export default FavoriteRecipes;
