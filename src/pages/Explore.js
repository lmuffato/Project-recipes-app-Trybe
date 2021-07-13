import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../compenents/Footer';
import Header from '../compenents/Header';
import SearchbarContext from '../contexts/SearchbarContext';

function Explore() {
  const { setHideSearchBtn } = useContext(SearchbarContext);

  useEffect(() => {
    setHideSearchBtn(false);
  }, []);

  return (
    <>
      <Header />
      <Link to="/explorar/comidas">
        <button
          type="button"
          data-testid="explore-food"
        >
          Explorar Comidas
        </button>
      </Link>

      <Link to="/explorar/bebidas">
        <button
          type="button"
          data-testid="explore-drinks"
        >
          Explorar Bebidas
        </button>
      </Link>
      <Footer />
    </>
  );
}

export default Explore;
