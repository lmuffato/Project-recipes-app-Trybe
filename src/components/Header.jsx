import React from 'react';
import PropTypes from 'prop-types';
import ProfileButton from './ProfileButton';
import SearchButton from './SearchButton';

export default function Header({ children }) {
  return (
    <header>
      <ProfileButton />
      { children }
      <SearchButton />
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};
