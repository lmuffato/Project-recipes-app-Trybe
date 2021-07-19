import React from 'react';
import PropTypes from 'prop-types';
// import { Container } from './styles';

export default function Instructions({ instruction }) {
  return (
    <div className="instructions-progress" data-testid="instructions">
      {instruction}
    </div>

  );
}

Instructions.propTypes = {
  instruction: PropTypes.object,
}.isRequired;
