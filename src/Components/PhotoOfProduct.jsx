import React from 'react';
import PropTypes from 'prop-types';

const PhotoOfProduct = ({ idn, currentProduct }) => (
  <img
    src={ currentProduct[0][`str${idn[1]}Thumb`] }
    alt="Product"
    data-testid="recipe-photo"
  />
);

PhotoOfProduct.propTypes = {
  currentProduct: PropTypes.arrayOf(PropTypes.object).isRequired,
  idn: PropTypes.arrayOf(PropTypes.object).isRequired,
}.isRequired;

export default PhotoOfProduct;
