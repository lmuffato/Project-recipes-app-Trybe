import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';

import './style.css';

const Explore = () => (
  <div className="container">
    <div className="buttons line">
      <Link to="/explorar/comidas">
        <button
          className="button"
          data-testid="explore-food"
          type="button"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button
          className="button"
          type="button"
          data-testid="explore-drinks"
          block
        >
          Explorar Bebidas
        </button>
      </Link>
    </div>
    <Footer />
  </div>
);

export default Explore;
