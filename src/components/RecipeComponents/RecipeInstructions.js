import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeInst(props) {
  const { instructions } = props;
  return (
    <p data-testid="instructions">{instructions}</p>
  );
}

RecipeInst.propTypes = {
  instructions: PropTypes.string.isRequired,
};
