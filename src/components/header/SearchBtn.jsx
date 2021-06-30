import React from 'react';
import SearchIcon from '../../images/searchIcon.svg';

export default function SearchBtn() {
  return (
    <div data-testid="search-top-btn">
      <img src={ SearchIcon } alt="Search icon" />
    </div>
  );
}
