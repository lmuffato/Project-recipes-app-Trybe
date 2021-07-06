import { string } from 'prop-types';
import React from 'react';

function Category({ category }) {
  return (
    <h3 data-testid="recipe-category">
      {category}
    </h3>
  );
}

Category.propTypes = {
  category: string.isRequired,
};

export default Category;
