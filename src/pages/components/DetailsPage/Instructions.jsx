import React from 'react';
import { string } from 'prop-types';

function Instructions(props) {
  const { recipe } = props;
  const instructions = recipe.strInstructions;
  return (
    <div data-testid="instructions" className="details-instructions">
      <h1 className="details-instructions-title">Instruções</h1>
      {' '}
      <p>{ instructions }</p>
    </div>
  );
}

Instructions.propTypes = {
  instructions: string,
}.isRequired;

export default Instructions;
