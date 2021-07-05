import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchImg from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function SearchButton({ page }) {
  const [searchBar, setsearchBar] = useState(false);
  function getSearchBar() {
    return searchBar ? setsearchBar(false) : setsearchBar(true);
  }

  return (
    <div>
      <button
        type="button"
        data-testid="search-top-btn"
        src={ SearchImg }
        alt="Search"
        onClick={ getSearchBar }
      >
        <img src={ SearchImg } alt="search" />
      </button>
      <div>
        { searchBar && <SearchBar page={ page } /> }
      </div>
    </div>
  );
}

SearchButton.propTypes = {
  props: PropTypes.object,
}.isRequired;
