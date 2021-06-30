import React from 'react';
import './Header.css';

function Header({ titulo, icone1, icone2 }) {
  return (
    <header className="m-Header">
      <img src={ icone1 } alt="" />
      <h1>{titulo}</h1>
      <img src={ icone2 } alt="" />
    </header>

  );
}

export default Header;
