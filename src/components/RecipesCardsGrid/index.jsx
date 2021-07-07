import React from 'react';
import PropTypes from 'prop-types';

import RecipeSimpleCard from './components/RecipeSimpleCard';

import styles from './styles.module.scss';

function RecipesCardsGrid({ recipes }) {
  return (
    <section className={ styles.grid }>
      {recipes.map((recipe, index) => (
        <RecipeSimpleCard key={ recipe.id } recipe={ recipe } index={ index } />
      ))}
    </section>
  );
}

RecipesCardsGrid.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecipesCardsGrid;
