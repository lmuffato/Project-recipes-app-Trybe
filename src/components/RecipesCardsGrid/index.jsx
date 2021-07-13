import React, { useContext } from 'react';

import { RecipesContext } from '../../context/Recipes';
import RecipeSimpleCard from './components/RecipeSimpleCard';

import styles from './styles.module.scss';

function RecipesCardsGrid() {
  const { recipes } = useContext(RecipesContext);
  return (
    <section className={ styles.grid }>
      {recipes.map((recipe, index) => (
        <RecipeSimpleCard
          key={ recipe.id }
          recipe={ recipe }
          index={ index }
          page="recipe"
        />
      ))}
    </section>
  );
}

export default RecipesCardsGrid;
