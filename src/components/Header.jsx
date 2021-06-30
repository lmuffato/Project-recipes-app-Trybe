import React from 'react';
import PropTypes from 'prop-types';
import ProfileButton from './ProfileButton';

export default function Header({ children }) {
  return (
    <header>
      <ProfileButton />
      { children }
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};
