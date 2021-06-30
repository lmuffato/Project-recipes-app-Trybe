import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchIcon from '../images/searchIcon.svg';
import ProfileImage from '../images/profileIcon.svg';

function Header({ title, search = false }) {
  const [displaySearch, setDisplaySearch] = useState(false);
  const history = useHistory();
  return (
    <header>
      <button
        type="button"
        onClick={ () => history.push() }
      >
        <img
          data-testid="profile-top-btn"
          src={ ProfileImage }
          alt="profileBtn"
        />
      </button>

      <h1 data-testid="page-title">{title}</h1>

      {search && (
        <button
          type="button"
          onClick={ () => setDisplaySearch(!displaySearch) }
        >
          <img
            src={ SearchIcon }
            alt="SearchBtn"
            data-testid="search-top-btn"
          />
        </button>
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;
