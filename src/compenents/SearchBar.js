import React, { useContext } from 'react';
import HeaderContext from '../contexts/HeaderContext';

function SearchBar() {
  const { searchBtn } = useContext(HeaderContext);

  function searchInput() {
    return (
      <div>
        <label htmlFor="searchBar">
          <input
            id="searchBar"
            type="text"
            data-testid="search-input"
          />
        </label>
      </div>
    );
  }

  return (
    <div>
      { searchBtn && searchInput() }
    </div>
  );
}

export default SearchBar;
