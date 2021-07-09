import React from 'react';
import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import useLocalStorage from '../../hooks/useLocalStorage';

function Header({ title }) {
  const { user, gravatar } = useLocalStorage('user', 'gravatar');
  return (
    <header className={ styles.header }>
      <Link to="/perfil" className={ styles.profilePic }>
        <img
          src={ gravatar || 'https://www.gravatar.com/avatar/default' }
          alt={ user ? user.email : 'user@mail.com' }
        />
      </Link>
      { title }
      <BiSearch />
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
