import React from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header({ title }) {
  const history = useHistory();

  const moveToPerfil = () => {
    history.push('/perfil');
  };

  const showSearchBar = () => {

  };

  return (
    <div className="header-container">
      <Button onClick={ moveToPerfil }>
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profile"
        />
      </Button>
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

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
