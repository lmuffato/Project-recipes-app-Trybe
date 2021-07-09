import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import FooterBar from '../components/FooterBar';
import HeaderExplore from '../components/HeaderExplore';

function ExploreFilters() {
  const location = useLocation();
  return (
    <main>
      <HeaderExplore />
      <Link to={ `${location.pathname}/ingredientes` }><h3>Por Ingredientes</h3></Link>
      <Link to={ `${location.pathname}/area` }><h3>Por local de origem</h3></Link>
      <h3>Me surpreenda</h3>
      <FooterBar />
    </main>
  );
}

export default ExploreFilters;
