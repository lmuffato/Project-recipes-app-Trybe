import React from 'react';
import { Link } from 'react-router-dom';
import FooterBar from '../components/FooterBar';
import HeaderExplore from '../components/HeaderExplore';

function Explore() {
  return (
    <main>
      <HeaderExplore />
      <Link to="/explorar/comidas" data-testid="explore-food"> Explorar Comidas </Link>
      <Link to="/explorar/bebidas" data-testid="explore-drinks"> Explorar Bebidas </Link>
      <FooterBar />
    </main>
  );
}

export default Explore;
