import React from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';

function Header({ props: { search, title } }) {
  // const history = useHistory();
  // const { pathname } = history.location;
  // const allName = pathname.split('/');
  // const firstName = `${allName[1].charAt(0).toLocaleUpperCase()}${allName[1].slice(1)}`;
  // const lastName = `${allName[2].charAt(0).toLocaleUpperCase()}${allName[2].slice(1)}`;

  return (
    <header>
      <img src={ profileIcon } data-testid="profile-top-btn" alt="profile icon" />
      <h1
        data-testid="page-title"
      >
        {title}
      </h1>
      {
        search && <img
          src={ searchIcon }
          data-testid="search-top-btn"
          alt="search icon"
        />
      }
    </header>
  );
}

Header.propTypes = {
  search: PropTypes.bool,
}.isRequired;

export default Header;
