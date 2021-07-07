import React from 'react';
import Header from '../../components/Header';
import BottomMenu from '../../components/bottomMenu';
import { Link } from 'react-router-dom';

export default function DrinksExplore() {
  return (
    <div>
      <Header title="Explorar Bebidas" show={ false } />

      <div className="buttonsExplore">
        <Link to="/explorar/bebidas/ingredientes">
          <button
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>

        <Link to="">
          <button
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
