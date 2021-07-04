import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div data-testid="footer">
      <Link
        to="/bebidas"
        data-testid="drinks-bottom-btn"
      >
        <img src="" alt="" />
      </Link>
      <Link
        to="/explorar"
        data-testid="explore-bottom-btn"
      >
        <img src="" alt="" />
      </Link>
      <Link
        to="/comidas"
        data-testid="food-bottom-btn"
      >
        <img src="" alt="" />
      </Link>
    </div>
  );
}

export default Footer;
