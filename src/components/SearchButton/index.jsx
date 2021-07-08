import React from 'react';
import SearchIcon from '../../images/searchIcon.svg';
import Button from '../shared/button';

function searchButton({ setSearchBar }) {
  return (
    <Button
      type="button"
      onClick={ () => setSearchBar((prevSearchBar) => !prevSearchBar) }
      name={ (<img src={ SearchIcon } alt="search-icon" data-testid="search-top-btn" />) }
    />
  );
}

export default searchButton;
