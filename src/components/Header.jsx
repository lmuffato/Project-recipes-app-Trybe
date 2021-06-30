import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const history = useHistory();
  const { pathname } = history.location;
  const page = pathname.substr(1);
  return (
    <header>
      <img src={ profileIcon } data-testid="profile-top-btn" alt="profile icon" />
      <h1
        data-testid="page-title"
      >
        {`${page.charAt(0).toUpperCase()}${page.slice(1)}`}
      </h1>
      <img src={ searchIcon } data-testid="search-top-btn" alt="search icon" />
    </header>
  );
}

export default Header;
