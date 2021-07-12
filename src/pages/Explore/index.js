import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import './style.css';

const Explore = () => (
  <div>
    <Header title="Explorar" />

    <div className="buttons-explore">
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
