import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Style.css';

function Explore() {
  return (
    <div>
      <Header />
      <div className="align-btn">
        <Link to="/explorar/comidas">
          <Button
            variant="custom"
            data-testid="explore-food"
            type="button"
          >
            Explorar Comidas
          </Button>
        </Link>
        <Link to="/explorar/bebidas">
          <Button
            variant="custom"
            data-testid="explore-drinks"
            type="button"
          >
            Explorar Bebidas
          </Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
