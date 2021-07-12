import React from 'react';
import PropTypes from 'prop-types';
// import { Container } from './styles';

export default function Title({ title }) {
  return (
    <h2 data-testid="recipe-title">{title}</h2>
  );
}

Title.propTypes = {
  title: PropTypes.object,
}.isRequired;
