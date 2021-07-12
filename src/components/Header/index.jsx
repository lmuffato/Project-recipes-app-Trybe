import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Search from './components/Search';

import styles from './styles.module.scss';
import useLocalStorage from '../../hooks/useLocalStorage';

function Header({ title }) {
  const [searchMode, setSearchMode] = useState(false);

  const { user, gravatar } = useLocalStorage('user', 'gravatar');
  return (
    <header className={ styles.header }>
      <div data-testid="page-title">
        <Link to="/perfil" className={ styles.profilePic }>
          <img
            src={ gravatar || 'https://www.gravatar.com/avatar/profileIcon' }
            alt={ user ? user.email : 'user@mail.com' }
            data-testid="profile-top-btn"
          />
        </Link>
        { title }
        <BiSearch
          onClick={ () => setSearchMode(!searchMode) }
          src="searchIcon"
          data-testid="search-top-btn"
        />
      </div>
      <Search visibility={ searchMode } />
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
