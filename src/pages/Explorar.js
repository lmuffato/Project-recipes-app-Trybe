import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Explorar.css';

export default function Explorar() {
  return (
    <div className="explore">
      <Header
        title="Explore"
        enableSearchIcon={ false }
      />
      <div className="explorar-buttons">
        <Link to="/explorar/comidas">
          <button
            className="button is-primary"
            type="button"
            data-testid="explore-food"
          >
            Explore Foods
          </button>
        </Link>
        <br />
        <Link to="explorar/bebidas">
          <button
            className="button is-primary"
            type="button"
            data-testid="explore-drinks"
          >
            Explore Drinks
          </button>
        </Link>
        <Footer />
      </div>
    </div>
  );
}
