import React, { useContext } from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchbarContext from '../contexts/SearchbarContext';

function Header() {
  const {
    searchBtn, setSearchBtn, hideSearchBtn, pageName,
  } = useContext(SearchbarContext);

  function getSearchBar() {
    return searchBtn ? setSearchBtn(false) : setSearchBtn(true);
  }

  const handleSearchBtn = () => (
    <button
      type="button"
      onClick={ getSearchBar }
      className="searchBtn"
    >
      <img src={ searchIcon } alt="magnifier" data-testid="search-top-btn" />
    </button>
  );

  return (
    <div className="header-cotainer" data-testid="header">
      <header className="header">
        <Link to="/perfil" className="profile">
          <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
        </Link>
        <h1 data-testid="page-title" className="title">{ pageName }</h1>
        { hideSearchBtn && handleSearchBtn() }
      </header>
    </div>
  );
}
/* { searchBtn && <SearchBar /> } */

export default Header;
