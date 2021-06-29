import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIconImg from '../../images/profileIcon.svg';
import searchIconImg from '../../images/searchIcon.svg';
import Button from '../Generics/Button';

function Header({ children }) {
  const history = useHistory();

  const handleRedirectToProfile = (ev) => {
    ev.preventDefault();
    history.push('/perfil');
  };

  return (
    <header>
      <Button onClick={ handleRedirectToProfile }>
        <img
          src={ profileIconImg }
          data-testid="profile-top-btn"
          alt="Logo da página de perfil"
        />
      </Button>
      { children }
      <Button>
        <img
          src={ searchIconImg }
          data-testid="search-top-btn"
          alt="Logo da página de perfil"
        />
      </Button>
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
