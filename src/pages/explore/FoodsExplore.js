import React from 'react';
import Header from '../../components/Header';
import BottomMenu from '../../components/bottomMenu';
import { Link } from 'react-router-dom';

export default function FoodsExplore() {
  return (
    <div>
      <Header title="Explorar Comidas" show={ false } />

      <div className="buttonsExplore">
        <Link to="/explorar/comidas/ingredientes">
          <button
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>

        <Link to="/explorar/comidas/area">
          <button
            data-testid="explore-by-area"
          >
            Por Local de Origem
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
