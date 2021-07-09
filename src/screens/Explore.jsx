import React from 'react';
import { Link } from 'react-router-dom';
import FooterBar from '../components/FooterBar';
import HeaderExplore from '../components/HeaderExplore';

function Explore() {
  return (
    <main>
      <HeaderExplore />
      <Link to="/explorar/comidas"> Explorar Comidas </Link>
      <Link to="/explorar/bebidas"> Explorar Bebidas </Link>
      <FooterBar />
    </main>
  );
}

export default Explore;
