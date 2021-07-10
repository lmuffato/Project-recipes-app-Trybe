import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './styles.css';

function ExploreButtons() {
  return (
    <div className="container">
      <Link to="/explorar/comidas">
        <Button
          className="myButton btn-lg btn-warning"
          data-testid="explore-food"
          type="button"
        >
          Explorar Comidas
        </Button>
      </Link>
      <Link to="/explorar/bebidas">
        <Button
          className="myButton btn-lg btn-warning"
          data-testid="explore-drinks"
          type="button"
        >
          Explorar Bebidas
        </Button>
      </Link>
    </div>
  );
}

export default ExploreButtons;
