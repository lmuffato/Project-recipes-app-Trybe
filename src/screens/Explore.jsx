import React from 'react';
import { Link } from 'react-router-dom';
import FooterBar from '../components/FooterBar';
import HeaderExplore from '../components/HeaderExplore';
import '../styleSheets/Explore.css';

function Explore() {
  return (
    <main className="container-explore">
      <HeaderExplore />
      <section className="explore-container">
        <Link
          to="/explorar/comidas"
          data-testid="explore-food"
          className="book-food"
        >
          Explorar Comidas
        </Link>
        <Link
          to="/explorar/bebidas"
          data-testid="explore-drinks"
          className="book-drink"
        >
          Explorar Bebidas
        </Link>
      </section>
      <FooterBar />
    </main>
  );
}

export default Explore;
