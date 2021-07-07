import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

function Categories({ categories }) {
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
        <label key={ category.strCategory } htmlFor={ category.strCategory }>
          <input
            type="radio"
            id={ category.strCategory }
            name="category"
          />
          <span data-testid={ `${category.strCategory}-category-filter` }>
            { category.strCategory }
          </span>
        </label>
      )) }
    </div>
  );
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.oneOfType(
    [PropTypes.object, PropTypes.string],
  )).isRequired,
};

export default Categories;
