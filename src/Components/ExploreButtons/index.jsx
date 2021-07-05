import React from 'react';
import { Link } from 'react-router-dom';
import './ExploreButtons.css';

function ExploreButtons() {
  return (
    <div className="container">
      <Link to="/explorar/comidas">
        <button
          className="myButton"
          data-testid="explore-food"
          type="button"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button
          className="myButton"
          data-testid="explore-drinks"
          type="button"
        >
          Explorar Bebidas
        </button>
      </Link>
    </div>
  );
}

export default ExploreButtons;
