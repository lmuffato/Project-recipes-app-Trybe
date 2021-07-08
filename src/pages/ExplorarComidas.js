import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ExplorarComidas() {
  return (
    <div>
      <Header
        title="Explorar Comidas"
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

      <Link to="/explorar/comidas/area">
        <button
          id="explore-by-area"
          type="submit"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>

      <Link to="/explorar/comidas/surprise">
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
