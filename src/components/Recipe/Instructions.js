import React from 'react';
import { string } from 'prop-types';

function Instructions({ text }) {
  return (
    <p
      className="p-instructions"
      data-testid="instructions"
    >
      {text}
    </p>
  );
}

Instructions.propTypes = {
  text: string.isRequired,
};

export default Instructions;
