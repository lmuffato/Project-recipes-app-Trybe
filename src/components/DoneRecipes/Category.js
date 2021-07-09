import { string, number } from 'prop-types';
import React from 'react';

function Category({ category, index }) {
  return (
    <h3 data-testid={ `${index}-horizontal-top-text` }>
      {category}
    </h3>
  );
}

Category.propTypes = {
  category: string.isRequired,
  index: number.isRequired,
};

export default Category;
