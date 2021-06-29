import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <btn data-testid="profile-top-btn">
        Perfil
      </btn>
      <h1 data-testid="page-title">Título</h1>
      <btn data-testid="search-top-btn">
        Pesquisa
      </btn>
    </header>
  );
}

export default Header;
