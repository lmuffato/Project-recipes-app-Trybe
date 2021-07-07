import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import getRecipes from '../../services/recipesData';
import RecipesCardsGrid from '../../components/RecipesCardsGrid';
import Categories from '../../components/Categories';
import Carousel from '../../components/Carousel';

import styles from './styles.module.scss';

function MainRecipes() {
  const { location: { pathname } } = useHistory();
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [titlePage, setTitlePage] = useState('');

  useEffect(() => {
    async function loadRecipes() {
      const recipesLimit = 12;
      const categoriesLimit = 5;
      const results = await getRecipes(pathname);
      setRecipes(results.list.slice(0, recipesLimit));
      setCategories(results.categories.slice(0, categoriesLimit));
      setTitlePage(results.titlePage);
    }

    loadRecipes();
  }, [pathname]);

  return (
    <div className={ styles.mainRecipes }>
      <Header title={ titlePage } />
      <div className={ styles.carousel }>
        <Carousel>
          <Categories categories={ categories } />
        </Carousel>
      </div>
      <main>
        <RecipesCardsGrid recipes={ recipes } />
      </main>
    </div>
  );
}

export default MainRecipes;
