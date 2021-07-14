import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Explore.css';

import Header from '../components/Header';
import Footer from '../components/Footer';

function Explorar() {
  return (
    <>
      <Header title="Explore" displayButton={ false } />
      <div className="path-buttons-container">
        <Link to="/explorar/comidas">
          <button
            className="path-btn"
            data-testid="explore-food"
            type="button"
          >
            Explore Meals

          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            className="path-btn"
            data-testid="explore-drinks"
            type="button"
          >
            Explore Drinks

          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Explorar;
