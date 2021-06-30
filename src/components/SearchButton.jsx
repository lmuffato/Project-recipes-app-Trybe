import React, { useState } from 'react';
import SearchImg from '../images/searchIcon.svg';
// import Searchbar from './Searchbar';

export default function SearchButton() {
  // const [searchBar, setsearchBar] = useState(false);
  // function getSearchBar() {
  //   return searchBar ? setsearchBar(false) : setsearchBar(true);
  // }

  return (
    <button
      type="button"
      data-testid="search-top-btn"
      src={ SearchImg }
      alt="Search"
      // onClick={ getSearchBar }
    >
      <img src={ SearchImg } alt="Search" />
      <div>
        {/* { searchbar && <Searchbar /> } */}
      </div>
    </button>
  );
}
