import React from 'react';
import PropTypes from 'prop-types';
// import { Container } from './styles';

export default function Instructions({ instruction }) {
  return (
    <div data-testid="instructions">
      {instruction}
    </div>

  );
}

Instructions.propTypes = {
  instruction: PropTypes.object,
}.isRequired;
