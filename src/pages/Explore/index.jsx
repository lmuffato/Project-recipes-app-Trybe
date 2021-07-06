import React from 'react';
import { Link } from 'react-router-dom';

function Explore() {
  return (
    <>
      <Link to="/explorar/comidas">
        <button data-testid="explore-food" type="button">Explorar Comidas</button>
      </Link>
      <Link to="/explorar/bebidas">
        <button type="button" data-testid="explore-drinks">Explorar Bebidas</button>
      </Link>
    </>
  );
}

export default Explore;
