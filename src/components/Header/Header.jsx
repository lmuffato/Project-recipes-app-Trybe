import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIconImg from '../../images/profileIcon.svg';
import Button from '../Generics/Button';
import HeaderContainer from './styles';

function Header({ children }) {
  const history = useHistory();

  const handleRedirectToProfile = (ev) => {
    ev.preventDefault();
    history.push('/perfil');
  };

  return (
    <HeaderContainer>
      <div className="container">
        <Button onClick={ handleRedirectToProfile }>
          <img
            src={ profileIconImg }
            data-testid="profile-top-btn"
            alt="Logo da página de perfil"
          />
        </Button>
      </div>
      { children }
    </HeaderContainer>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
