import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import getRecipes from '../../services/recipesData';

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
        <div key={ recipe.id } data-testid={ `${index}-recipe-card` }>
          <h1 data-testid={ `${index}-card-name` }>{recipe.name}</h1>
          <img
            src={ recipe.imagePath }
            alt={ recipe.name }
            data-testid={ `${index}-card-img` }
          />
        </div>
      ))}
    </>
  );
}

export default MainRecipes;
