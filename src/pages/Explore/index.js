import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import './style.css';

const Explore = () => (
  <div className="container">
    <Header title="Explorar" />
    <div className="buttons line">
      <Link
        to="/explorar/comidas"
        className="button"
        data-testid="explore-food"
      >
        Explorar Comidas
      </Link>
      <Link
        to="/explorar/bebidas"
        className="button"
        data-testid="explore-drinks"
      >
        Explorar Bebidas
      </Link>
    </div>
    <Footer />
  </div>
);

export default Explore;
