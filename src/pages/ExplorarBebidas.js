import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ExplorarBebidas() {
  return (
    <div>
      <Header
        title="Explorar Bebidas"
        enableSearchIcon={ false }
      />
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="submit"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>

      <Link to="/explorar/bebidas/surprise">
        <button
          type="submit"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </div>
  );
}
