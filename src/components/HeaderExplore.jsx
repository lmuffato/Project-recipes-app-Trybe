import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import '../styleSheets/Header.css';

function HeaderExplore() {
  const location = useLocation();
  const title = location.pathname.substring(1);
  let titleRoute = title.slice(title.indexOf('/')).substring(1);
  if (titleRoute.includes('/')) {
    titleRoute = titleRoute.slice(title.indexOf('/'));
  }
  const titleCapitalize = titleRoute.charAt(0).toUpperCase() + titleRoute.slice(1);
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
      <h3 data-testid="page-title" className="Title">
        { location.pathname === '/perfil' ? 'Perfil' : `Explorar ${titleCapitalize}`}
      </h3>
      <div className="explore-icon" />
    </div>
  );
}

export default HeaderExplore;
