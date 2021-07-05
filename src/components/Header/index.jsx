import React from 'react';
import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

function Header({ title }) {
  const user = useLocalStorage('user');
  return (
    <header>
      <Link to="/perfil">
        <img src={ user.gravatar } alt={ user.email } />
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
