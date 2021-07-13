import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import FooterBar from '../components/FooterBar';
import HeaderExplore from '../components/HeaderExplore';

function ExploreFilters() {
  const { pathname } = useLocation();
  return (
    <main>
      <HeaderExplore />
      <Link
        to={ `${pathname}/ingredientes` }
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Link>
      {pathname === '/explorar/comidas'
        && <Link
          to={ `${pathname}/area` }
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </Link>}

      <Link
        to={ `${pathname}/area` }
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </Link>
      <FooterBar />
    </main>
  );
}

export default ExploreFilters;
