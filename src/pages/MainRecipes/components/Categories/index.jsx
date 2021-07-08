import React, { useContext } from 'react';
import { RecipesContext } from '../../../../context/Recipes';

import styles from './styles.module.scss';

function Categories() {
  const { categories, filterByCategory } = useContext(RecipesContext);
  return (
    <div className={ styles.categories }>
      <label htmlFor="All">
        <input
          type="radio"
          id="All"
          name="category"
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
            onClick={ (event) => filterByCategory(category.strCategory, event) }
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
