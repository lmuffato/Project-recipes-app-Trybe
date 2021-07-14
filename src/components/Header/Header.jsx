import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIconImg from '../../images/profileIcon.svg';
import Button from '../Generics/Button';
import HeaderContainer from './styles';
import Logo from './Logo';

function Header({ children, heading }) {
  const history = useHistory();

  const handleRedirectToProfile = (ev) => {
    ev.preventDefault();
    history.push('/perfil');
  };

  return (
    <HeaderContainer>
      <div className="title-container">
        <Logo />
        <h1 data-testid="page-title">{ heading }</h1>
      </div>
      <div className="container">
        <Button onClick={ handleRedirectToProfile }>
          <img
            src={ profileIconImg }
            data-testid="profile-top-btn"
            alt="Logo da página de perfil"
          />
        </Button>
        { children }
      </div>
    </HeaderContainer>
  );
}

Header.defaultProps = {
  children: '',
};

Header.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.string.isRequired,
};

export default Header;
