import React, { useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styleSheets/Header.css';
import ContextRecipes from '../context/ContextRecipes';

function Header() {
  const { showSearchBar, setShowSearchBar } = useContext(ContextRecipes);
  const location = useLocation();
  const title = location.pathname.substring(1);
  const titleCapitalize = title.charAt(0).toUpperCase() + title.slice(1);
  // fonte: https://flexiple.com/javascript-capitalize-first-letter/#:~:text=To%20capitalize%20the%20first%20character,()%20function%20to%20capitalize%20it.

  return (
    <div className="Header">
      <Link to="/perfil">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profile icon"
          className="explore-icon"
        />
      </Link>
      <h3 className="explore" data-testid="page-title">
        { location.pathname === '/comidas'
        || location.pathname === '/bebidas'
          ? `${titleCapitalize}` : 'Explorar Origem' }
      </h3>
      <button
        className="exploreBtn"
        type="button"
        onClick={ (() => setShowSearchBar(!showSearchBar)) }
      >
        <img
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="search icon"
          className="explore-icon"
        />
      </button>
    </div>
  );
}

export default Header;
