import React from 'react';
import { arrayOf, object, func } from 'prop-types';
import '../styles/Categories.css';

export default function Categories({ categories, handleCategoryClick }) {
  const hasCategories = categories.length > 0;

  return (
    <nav>
      <ul id="category-list" className="categoryList">
        <li className="category">
          <button
            data-testid="All-category-filter"
            type="button"
            className="btn-category"
            onClick={ () => handleCategoryClick('All') }
          >
            All
          </button>
        </li>

        {hasCategories && categories.map(({ strCategory: category }) => (
          <li
            key={ category }
            className="category"
          >
            <button
              data-testid={ `${category}-category-filter` }
              type="button"
              className="btn-category"
              onClick={ () => handleCategoryClick(category) }
            >
              { category }
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Categories.propTypes = {
  categories: arrayOf(object),
  handleCategoryClick: func,
}.isRequired;
