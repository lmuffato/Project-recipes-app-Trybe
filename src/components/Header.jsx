import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

class Header extends React.Component {
  render() {
    const { title, children } = this.props;
    return (
      <header>
        <Link to="/perfil">
          <button
            type="submit"
          >
            <img src={ profileIcon } alt="perfil" data-testid="profile-top-btn" />
          </button>
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        {children}
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Header;
