import React, { useContext } from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
// import { transitions, position, Provider as AlertProvider } from 'react-alert';
// import AlertTemplate from 'react-alert-template-basic';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchbarContext from '../contexts/SearchbarContext';
// import SearchBar from './SearchBar';

function Header() {
  const { searchBtn, setSearchBtn } = useContext(SearchbarContext);
  // const options = {
  //   position: positions.BOTTOM_CENTER,
  //   timeout: 5000,
  //   offset: '30px',
  //   transition: transitions.SCALE,
  // };

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
      {/* { searchBtn && <SearchBar /> } */}
    </div>
  );
}

export default Header;
