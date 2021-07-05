import React from 'react';
import { Link } from 'react-router-dom';
import FooterMenu from '../../components/footerMenu';

export default function ExplorePage() {
  return (
    <div>
      <p>INSERIR HEADER </p>
      <button type="button">
        <Link to="/explorar/comidas" data-testid="explore-food">
          Explorar Comidas
        </Link>
      </button>

      <button type="button">
        <Link to="/explorar/bebidas" data-testid="explore-drinks">
          Explorar Bebidas
        </Link>
      </button>

      <FooterMenu />
    </div>
  );
}
