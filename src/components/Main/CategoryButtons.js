import React from 'react';
import PropTypes from 'prop-types';

const NUMBER_OF_CATEGORIES = 5;

export default function CategoryButtons({ categories }) {
  return (
    <div>
      {categories.map((categoryName, index) => (
        index < NUMBER_OF_CATEGORIES ? (
          <button
            type="submit"
            key={ index }
            data-testid={ `${categoryName.strCategory}-category-filter` }
          >
            {categoryName.strCategory}
          </button>) : ''
      ))}
    </div>
  );
}

CategoryButtons.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;
