import React, { useContext } from 'react';
import SearchIcon from '../../images/searchIcon.svg';
import { AppContext } from '../../context/AppContext';
import SearchBar from '../searchBar/index';

export default function SearchBtn() {
  const {
    displaySearchBarToggle,
    displaySearchBar,
  } = useContext(AppContext);

  return (
    <div data-testid="search-top-btn">
      <button
        type="button"
        onClick={ displaySearchBarToggle }
      >
        <img src={ SearchIcon } alt="Search icon" />
      </button>
      <div>
        {displaySearchBar && <SearchBar />}
      </div>
    </div>
  );
}
