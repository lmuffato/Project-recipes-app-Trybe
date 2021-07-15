import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { RecipesContext } from '../../context/Recipes';
import RecipeSimpleCard from './components/RecipeSimpleCard';

import styles from './styles.module.scss';

function RecipesCardsGrid() {
  const { recipes } = useContext(RecipesContext);
  const history = useHistory();
  return (
    <section className={ styles.grid }>
      {recipes.map((recipe, index) => (
        <Link key={ recipe.id } to={ `${history.location.pathname}/${recipe.id}` }>
          <RecipeSimpleCard
            recipe={ recipe }
            index={ index }
          />
        </Link>
      ))}
    </section>
  );
}

export default RecipesCardsGrid;
