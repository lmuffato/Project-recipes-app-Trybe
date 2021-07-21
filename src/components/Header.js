import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../icons/appIcons/UserAvatar.png';
import searchIcon from '../icons/appIcons/searchGlass.png';
// import profileIcon from '../images/profileIcon.svg';
import PageTitle from './PageTitle';
import SearchBar from './SearchBar';
import './Header.css';

const title = (handleToggle) => (
  <h1 data-testid="page-title">
    <Link to="/perfil">
      <button
        className="profile-icon"
        type="button"
        data-testid="profile-top-btn"
        src={ profileIcon }
      >
        <img className="profile-icon-img" src={ profileIcon } alt="profile-icon" />
      </button>
    </Link>
    {' '}
    <PageTitle />
    {' '}
    <button
      id="search-btn"
      type="button"
      data-testid="search-top-btn"
      onClick={ handleToggle }
      src={ searchIcon }
      className="search-button"
    >
      <img className="search-icon-img" src={ searchIcon } alt="search-icon" />
    </button>
  </h1>
);

function Header() {
  const [isHidden, setIsHidden] = useState('true');
  const handleToggle = () => {
    setIsHidden(!isHidden);
  };
  // const pageTitle = (window.location.pathname).substr(1);
  // const title = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

  return (
    <div>
      <div className="header-wrapper">
        {title(handleToggle)}
      </div>
      <div id="search-bar" className={ isHidden ? 'hidden' : 'notHidden' }>
        {isHidden ? <div /> : <SearchBar />}
      </div>
    </div>
  );
}

export default Header;
