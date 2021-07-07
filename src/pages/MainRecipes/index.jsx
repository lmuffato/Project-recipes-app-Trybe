import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import getRecipes from '../../services/recipesData';
import RecipesCardsGrid from '../../components/RecipesCardsGrid';

import styles from './styles.module.scss';

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
    <div className={ styles.mainRecipes }>
      <Header title={ titlePage } />
      <main>
        <RecipesCardsGrid recipes={ recipes } />
      </main>
    </div>
  );
}

export default MainRecipes;
