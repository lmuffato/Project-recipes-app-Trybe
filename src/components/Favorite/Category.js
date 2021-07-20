import { string, number } from 'prop-types';
import React from 'react';

function Category({ category, index }) {
  return (
    <p data-testid={ `${index}-horizontal-top-text` } className="favorite-category">
      {category}
    </p>
  );
}

Category.propTypes = {
  category: string.isRequired,
  index: number.isRequired,
};

export default Category;
