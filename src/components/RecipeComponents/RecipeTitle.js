import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeTitle(props) {
  const { title } = props;
  return (<h1 data-testid="recipe-title" className="title">{title}</h1>);
}

RecipeTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
