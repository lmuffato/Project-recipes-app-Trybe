import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBarForm from './search bar/SearchBarForm';

function Header({ title }) {
  const [searchBar, setSearchBar] = useState(false);
  const location = useLocation();

  const showSearchBar = () => (searchBar === false ? setSearchBar(true)
    : setSearchBar(false));

  if (location.pathname !== '/comidas'
  && location.pathname !== '/bebidas'
  && location.pathname !== 'explorar'
  && location.pathname !== '/explorar/comidas/area') {
    return (
      <div className="header-container">
        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile"
          />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
      </div>
    );
  }
  if (searchBar === true) {
    return (
      <>
        <div className="header-container">
          <Link to="/perfil">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profile"
            />
          </Link>
          <h1 data-testid="page-title">{title}</h1>
          <Button onClick={ showSearchBar }>
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="search"
            />
          </Button>
        </div>
        <div>
          <SearchBarForm />
        </div>
      </>
    );
  } if (searchBar === false) {
    return (
      <div className="header-container">
        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile"
          />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        <Button onClick={ showSearchBar }>
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search"
          />
        </Button>
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;

// explorar sem lupa
// explorar comidas sem lupa
// explorar ingredientes sem lupa
// explorar origem com lupa
// receitas feitas sem lupa
// perfil sem lupa
// receitas favoritas sem lupa
