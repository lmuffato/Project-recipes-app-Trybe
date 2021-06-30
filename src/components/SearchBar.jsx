import React from 'react';
import PropTypes from 'prop-types';

export default function SearchBar({ style, searchActive }) {
  return (
    <div
      className={ `search-bar-container${searchActive ? ' active' : ''}` }
      data-testid="search-bar"
      style={ style }
    >
      SEARCH BAR
    </div>
  );
}

SearchBar.propTypes = {
  style: PropTypes.shape({}),
  searchActive: PropTypes.bool,
}.isRequired;
