import React from 'react';
import PropTypes from 'prop-types';

const CategoryOfProduct = ({ currentProduct }) => (
  <h3 data-testid="recipe-category">{currentProduct[0].strCategory}</h3>
);

CategoryOfProduct.propTypes = {
  currentProduct: PropTypes.arrayOf(PropTypes.object).isRequired,
  strCategory: PropTypes.string.isRequired,
}.isRequired;

export default CategoryOfProduct;
