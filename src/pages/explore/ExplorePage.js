import React from 'react';
import { Link } from 'react-router-dom';
import BottomMenu from '../../components/bottomMenu';
import Header from '../../components/Header';

export default function ExplorePage() {
  return (
    <div>
      <Header title="Explorar" show={ false } />
      <div className="buttonsExplore">
        <Link to="/explorar/comidas">
          <button
            data-testid="explore-food"
            type="button"
          >
            Explorar Comidas
          </button>
        </Link>

        <Link to="/explorar/bebidas">
          <button
            data-testid="explore-drinks"
            type="button"
          >
              Explorar Bebidas
          </button>
        </Link>
      </div>
      <BottomMenu />
    </div>
  );
}
