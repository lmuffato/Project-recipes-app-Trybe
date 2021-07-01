import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import search from '../images/searchIcon.svg';
import profile from '../images/profileIcon.svg';

class Header extends React.Component {
  render() {
    const { title } = this.props;

    return (
      <header>
        <Link to="/perfil">
          <button type="submit" data-testid="profile-top-btn">
            <img src={ profile } alt="explore" />
          </button>
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        <button
          type="submit"
          data-testid="search-top-btn"
        >
          <img src={ search } alt="explore" />
        </button>
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
