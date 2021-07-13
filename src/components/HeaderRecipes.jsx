import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import '../style/Header.css';

function HeaderRecipes() {
  const location = useLocation();
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
      <h3 data-testid="page-title" className="Explore">
        { location.pathname.includes('feitas') ? 'Receitas Feitas' : 'Receitas Favoritas'}
      </h3>
    </div>
  );
}

export default HeaderRecipes;
