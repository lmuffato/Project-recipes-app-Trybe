import React from 'react';
import { string } from 'prop-types';

function Instructions(props) {
  const { recipe } = props;
  const instructions = recipe.strInstructions;
  return (
    <div data-testid="instructions">
      Instruções
      { instructions }
    </div>
  );
}

Instructions.propTypes = {
  instructions: string,
}.isRequired;

export default Instructions;
