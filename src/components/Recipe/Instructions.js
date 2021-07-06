import React from 'react';
import { string } from 'prop-types';

function Instructions({ text }) {
  return (
    <section
      data-testid="instructions"
    >
      {text}
    </section>
  );
}

Instructions.propTypes = {
  text: string.isRequired,
};

export default Instructions;
