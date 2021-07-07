import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FoodContext } from '../Context/FoodProvider';

const TitleOfProduct = ({ idn }) => {
  const { currentProduct } = useContext(FoodContext);
  return (
    <h2 data-testid="recipe-title">{currentProduct[0][`str${idn[1]}`]}</h2>
  );
};

TitleOfProduct.propTypes = {
  currentProduct: PropTypes.arrayOf(PropTypes.object).isRequired,
  idn: PropTypes.arrayOf(PropTypes.object).isRequired,
}.isRequired;

export default TitleOfProduct;
