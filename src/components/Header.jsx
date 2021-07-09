import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import './Style.css';

function Header() {
  const pageTitle = () => {
    const path = window.location.pathname;
    const str = path.substring(1);
    const arr = str.split('/');
    for (let index = 0; index < arr.length; index += 1) {
      arr[index] = arr[index].charAt(0).toUpperCase() + arr[index].slice(1);
    }
    const title = arr.join(' ');
    if (title === 'Explorar Comidas Ingredientes'
     || title === 'Explorar Bebidas Ingredientes') {
      return 'Explorar Ingredientes';
    } if (title === 'Receitas-feitas') {
      return 'Receitas Feitas';
    } if (title === 'Receitas-favoritas') {
      return 'Receitas Favoritas';
    } return title;
  };
  return (
    <div className="header">
      <div className="header-content">
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="profile-icon"
            data-testid="profile-top-btn"
            className="profile-top-btn altSvg"
          />
        </Link>
        <h4 data-testid="page-title">{pageTitle()}</h4>
      </div>
    </div>
  );
}

export default Header;
