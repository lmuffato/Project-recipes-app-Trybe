import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import getRecipes from '../../services/recipesData';
import RecipeSimpleCard from '../../components/RecipeSimpleCard';

function MainRecipes() {
  const { location: { pathname } } = useHistory();
  const [recipes, setRecipes] = useState([]);
  const [titlePage, setTitlePage] = useState('');

  useEffect(() => {
    async function loadRecipes() {
      const arrayLimit = 12;
      const results = await getRecipes(pathname);
      setRecipes(results.list.slice(0, arrayLimit));
      setTitlePage(results.titlePage);
    }

    loadRecipes();
  }, [pathname]);

  return (
    <>
      <Header title={ titlePage } />
      {recipes.map((recipe, index) => (
        <RecipeSimpleCard key={ recipe.id } recipe={ recipe } index={ index } />
      ))}
    </>
  );
}

export default MainRecipes;
