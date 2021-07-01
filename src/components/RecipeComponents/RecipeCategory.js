import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeCatg(props) {
  const { category } = props;
  return (<h4 data-testid="recipe-category">{category}</h4>
  );
}

RecipeCatg.propTypes = {
  category: PropTypes.string.isRequired,
};
