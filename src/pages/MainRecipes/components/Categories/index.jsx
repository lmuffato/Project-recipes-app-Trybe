import React, { useContext } from 'react';
import { RecipesContext } from '../../../../context/Recipes';

import styles from './styles.module.scss';

function Categories() {
  const { categories, filterRecipe } = useContext(RecipesContext);

  return (
    <div className={ styles.categories }>
      <label htmlFor="All" data-testid="All-category-filter">
        <input
          type="radio"
          id="All"
          name="category"
          onClick={ () => filterRecipe({ type: 'category', content: 'All' }) }
          defaultChecked
        />
        <span>
          All
        </span>
      </label>
      { categories.map((category) => (
        <label
          key={ category.strCategory }
          htmlFor={ category.strCategory }
        >
          <input
            type="radio"
            id={ category.strCategory }
            name="category"
            onClick={ (event) => filterRecipe({
              type: 'category',
              content: category.strCategory,
            }, event) }
          />
          <span data-testid={ `${category.strCategory}-category-filter` }>
            { category.strCategory }
          </span>
        </label>
      )) }
    </div>
  );
}

export default Categories;
