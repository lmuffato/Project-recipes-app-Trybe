import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

function Explorar() {
  return (
    <section>
      <Header title="Explorar" show={ false } />
      <Link to="/explorar/comidas">
        <button
          data-testid="explore-food"
          type="button"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button
          data-testid="explore-drinks"
          type="button"
        >
          Explorar Bebidas
        </button>
      </Link>
      <footer>
        <Footer />
      </footer>
    </section>);
}

export default Explorar;
