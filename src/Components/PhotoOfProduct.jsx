import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FoodContext } from '../Context/FoodProvider';

const PhotoOfProduct = ({ idn }) => {
  const { currentProduct } = useContext(FoodContext);
  return (
    <img
      src={ currentProduct[0][`str${idn[1]}Thumb`] }
      alt="Product"
      data-testid="recipe-photo"
    />
  );
};

PhotoOfProduct.propTypes = {
  currentProduct: PropTypes.arrayOf(PropTypes.object).isRequired,
  idn: PropTypes.arrayOf(PropTypes.object).isRequired,
}.isRequired;

export default PhotoOfProduct;
