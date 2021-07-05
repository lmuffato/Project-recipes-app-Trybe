import React from 'react';
import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

import styles from './styles.module.scss';

function Header({ title }) {
  const user = useLocalStorage('user');
  const gravatar = localStorage.getItem('gravatar');

  return (
    <header className={ styles.header }>
      <Link to="/perfil" className={ styles.profilePic }>
        <img src={ gravatar } alt={ user.email } />
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
