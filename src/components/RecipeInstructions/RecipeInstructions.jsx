import React from 'react';
import PropTypes from 'prop-types';

function RecipeInstructions({ singleRecipe }) {
  return (
    <>
      <h3>Instructions</h3>
      <div className="instructions">
        <p data-testid="instructions">
          { singleRecipe.strInstructions }
        </p>
      </div>
    </>
  );
}

export default RecipeInstructions;

RecipeInstructions.propTypes = {
  singleRecipe: PropTypes.shape().isRequired,
};
