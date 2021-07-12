import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Explore.css';

import Header from '../components/Header';
import Footer from '../components/Footer';

function Explorar() {
  return (
    <>
      <Header title="Explorar" displayButton={ false } />
      <div className="path-buttons-container">
        <Link to="/explorar/comidas">
          <button
            className="path-btn"
            data-testid="explore-food"
            type="button"
          >
            Explorar Comidas

          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            className="path-btn"
            data-testid="explore-drinks"
            type="button"
          >
            Explorar Bebidas

          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Explorar;
