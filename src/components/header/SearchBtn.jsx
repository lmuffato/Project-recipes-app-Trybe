import React, { useContext } from 'react';
import SearchIcon from '../../images/searchIcon.svg';
import { AppContext } from '../../context/AppContext';
import SearchBar from '../searchBar/index';

export default function SearchBtn() {
  const {
    displaySearchBar,
    setDisplaySearchBar,
  } = useContext(AppContext);

  return (
    <div>
      <button
        type="button"
        onClick={ () => setDisplaySearchBar(!displaySearchBar) }
        data-testid="search-top-btn"
      >
        <img src={ SearchIcon } alt="Search icon" />
      </button>
      <div>
        {displaySearchBar && <SearchBar />}
      </div>
    </div>
  );
}
