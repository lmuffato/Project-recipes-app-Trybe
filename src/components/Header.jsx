import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

class Header extends React.Component {
  render() {
    const { title, children } = this.props;
    return (
      <header className="header">
        <Link to="/perfil">
          <button
            type="submit"
            className="headerIcons"
          >
            <img src={ profileIcon } alt="perfil" data-testid="profile-top-btn" />
          </button>
        </Link>
        <h1 data-testid="page-title" className="headerTitle">{title}</h1>
        {children !== undefined ? children : <div /> }
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Header.defaultProps = {
  children: false,
};

export default Header;
