import React from 'react';
import { Link } from 'react-router-dom';

function Explore (){
  return (
    <div>
    <Link to="/explorar/comidas">
      <button
        data-testid="explore-food"
      >
        Explorar Comidas
      </button>
    </Link>

    <Link to="/explorar/bebidas">
    <button
      data-testid="explore-drinks"
    >
      Explorar Bebidas
    </button>
    </Link>
  </div>
  )
}

export default Explore;