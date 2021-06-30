import React from 'react';
import PropTypes from 'prop-types';
import SearchBtn from './SearchBtn';
import ProfileBtn from './ProfileBtn';

export default function Header({ title = 'Headers', isSearch = true }) {
  return (
    <div>
      <ProfileBtn />
      <span data-testid="page-title">
        { title }
      </span>
      { isSearch ? <SearchBtn data-testid="search-top-btn" /> : null}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  isSearch: PropTypes.bolean,
}.isRequired;
