import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Search() {
  return (
    <div>
      <Header title="Explorar" />
      <div className="cardsGroup">
        <Link to="/explorar/comidas">
          <button
            type="button"
            data-testid="explore-food"
            className="itemCard exploreButtons"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            type="button"
            data-testid="explore-drinks"
            className="itemCard exploreButtons"
          >
            Explorar Bebidas
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Search;
