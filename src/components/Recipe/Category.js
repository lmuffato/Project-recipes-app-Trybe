import { string } from 'prop-types';
import React from 'react';

function Category({ category }) {
  return (
    <p
      className="p-detalhes"
      data-testid="recipe-category"
    >
      {category}
    </p>
  );
}

Category.propTypes = {
  category: string.isRequired,
};

export default Category;
