import React, { useContext } from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import HeaderContext from '../contexts/HeaderContext';
import SearchBar from './SearchBar';

function Header() {
  const { searchBtn, setSearchBtn } = useContext(HeaderContext);

  function getSearchBar() {
    return searchBtn ? setSearchBtn(false) : setSearchBtn(true);
  }

  return (
    <div className="header-cotainer">
      <header className="header">
        <Link to="/perfil" data-testid="profile-top-btn" className="profile">
          <img src={ profileIcon } alt="profile" />
        </Link>
        <h1 data-testid="page-title" className="title">Título</h1>
        <button
          type="button"
          data-testid="search-top-btn"
          onClick={ getSearchBar }
          className="searchBtn"
        >
          <img src={ searchIcon } alt="magnifier" />
        </button>
      </header>
      <SearchBar />
    </div>
  );
}

export default Header;
