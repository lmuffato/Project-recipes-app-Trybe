import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { RecipesContext } from '../../context/Recipes';
import Header from '../../components/Header';
import RecipesCardsGrid from '../../components/RecipesCardsGrid';
import Categories from './components/Categories';
import Carousel from '../../components/Carousel';
import Footer from '../../components/footer';

import styles from './styles.module.scss';

function MainRecipes({ location: { state } }) {
  const { titlePage, loadRecipes, filterRecipe } = useContext(RecipesContext);
  const { location: { pathname } } = useHistory();

  useEffect(() => {
    loadRecipes(pathname);
  }, [pathname, loadRecipes]);

  useEffect(() => {
    if (state && state.ingredient) {
      const { name } = state.ingredient;
      filterRecipe({ type: 'ingredient', content: name, pathname });
    }
  }, [state, filterRecipe, pathname]);

  return (
    <div className={ styles.mainRecipes }>
      <Header title={ titlePage } />
      <div className={ styles.carousel }>
        <Carousel>
          <Categories />
        </Carousel>
      </div>
      <main>
        <RecipesCardsGrid />
      </main>
      <Footer />
    </div>
  );
}

MainRecipes.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      ingredient: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default MainRecipes;
