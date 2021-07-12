import React from 'react';
import PropTypes from 'prop-types';
// import { Container } from './styles';

export default function Category({ category }) {
  return (
    <h4 data-testid="recipe-category">{category}</h4>
  );
}

Category.propTypes = {
  category: PropTypes.object,
}.isRequired;
