import React from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '../images/searchIcon.svg';
import ProfileImage from '../images/profileIcon.svg';

function Header() {
  return (
    <header>
      <div>
        <Link to="/perfil">
          <img
            src={ ProfileImage }
            alt="profileIcon"
            data-testid="profile-top-btn"
          />
        </Link>
        <button
          type="submit"
          data-testid="search-top-btn"
        >
          { SearchIcon }
        </button>
      </div>
    </header>
  );
}

export default Header;
