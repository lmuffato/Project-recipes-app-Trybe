import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../style/Header.css';

function Header() {
  const location = useLocation();
  const title = location.pathname.substring(1);
  let titleRoute = title.slice(title.indexOf('/')).substring(1);
  if (titleRoute.includes('/')) {
    titleRoute = titleRoute.slice(title.indexOf('/'));
  }
  const titleCapitalize = titleRoute.charAt(0).toUpperCase() + title.slice(1);
  // fonte: https://flexiple.com/javascript-capitalize-first-letter/#:~:text=To%20capitalize%20the%20first%20character,()%20function%20to%20capitalize%20it.
  return (
    <div className="Header">
      <Link to="/perfil">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profile icon"
        />
      </Link>
      <h3 data-testid="page-title">
        { location.pathname === '/comidas'
        || location.pathname === '/bebidas'
          ? `${titleCapitalize}` : 'Explorar Origem' }
      </h3>
      <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="search icon"
      />
    </div>
  );
}

export default Header;
