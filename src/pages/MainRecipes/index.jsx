import React, { useContext } from 'react';
import { RecipesContext } from '../../context/Recipes';
import Header from '../../components/Header';
import RecipesCardsGrid from '../../components/RecipesCardsGrid';
import Categories from './components/Categories';
import Carousel from '../../components/Carousel';

import styles from './styles.module.scss';

function MainRecipes() {
  const { recipes, categories, titlePage } = useContext(RecipesContext);

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
