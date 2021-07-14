import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeImage(props) {
  const { origin } = props;
  return (
    <img
      data-testid="recipe-photo"
      src={ origin }
      alt="recipe"
    />
  );
}

RecipeImage.propTypes = {
  origin: PropTypes.string.isRequired,
};
