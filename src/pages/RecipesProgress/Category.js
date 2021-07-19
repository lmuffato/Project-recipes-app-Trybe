import React from 'react';
import PropTypes from 'prop-types';
// import { Container } from './styles';

export default function Category({ category }) {
  return (
    <p className="category-title" data-testid="recipe-category">{category}</p>
  );
}

Category.propTypes = {
  category: PropTypes.object,
}.isRequired;
