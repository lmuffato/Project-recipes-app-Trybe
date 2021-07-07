import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import BottomMenu from '../../components/bottomMenu';

export default function DrinksExplore() {
  return (
    <div>
      <Header title="Explorar Bebidas" show={ false } />

      <div className="buttonsExplore">
        <Link to="/explorar/bebidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>

        <Link to="/">
          <button
            type="button"
            data-testid="explore-surprise"
          >
            Me Surpreenda!
          </button>
        </Link>
      </div>

      <BottomMenu />
    </div>
  );
}
