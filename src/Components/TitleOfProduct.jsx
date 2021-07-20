import React from 'react';
import PropTypes from 'prop-types';

const TitleOfProduct = ({ idn, currentProduct }) => (
  <h2 data-testid="recipe-title">{currentProduct[0][`str${idn[1]}`]}</h2>
);

TitleOfProduct.propTypes = {
  currentProduct: PropTypes.arrayOf(PropTypes.object).isRequired,
  idn: PropTypes.arrayOf(PropTypes.object).isRequired,
}.isRequired;

export default TitleOfProduct;
