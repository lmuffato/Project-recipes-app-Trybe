import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchIcon from '../images/searchIcon.svg';
import ProfileImage from '../images/profileIcon.svg';

function Header({ title, searchBtn = true }) {
  const [displaySearch, setDisplaySearch] = useState(false);
  const history = useHistory();
  return (
    <header>
      <button
        type="button"
        onClick={ () => history.push('./perfil') }
        data-testid="profile-top-btn"
        src={ ProfileImage }
      >
        .
      </button>

      <h1 data-testid="page-title">{title}</h1>
      {searchBtn
        && (
          <button
            type="button"
            onClick={ () => setDisplaySearch(!displaySearch) }
            data-testid="search-top-btn"
            src={ SearchIcon }
          >
            .
          </button>
        )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchBtn: PropTypes.bool.isRequired,
};

export default Header;
