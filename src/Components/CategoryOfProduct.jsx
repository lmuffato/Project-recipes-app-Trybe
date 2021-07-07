import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FoodContext } from '../Context/FoodProvider';

const CategoryOfProduct = () => {
  const { currentProduct } = useContext(FoodContext);
  return (
    <h3 data-testid="recipe-category">{currentProduct[0].strCategory}</h3>
  );
};

CategoryOfProduct.propTypes = {
  currentProduct: PropTypes.arrayOf(PropTypes.object).isRequired,
  strCategory: PropTypes.string.isRequired,
}.isRequired;

export default CategoryOfProduct;
