import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../compenents/Footer';
import Header from '../compenents/Header';
import SearchbarContext from '../contexts/SearchbarContext';

function Explore() {
  const { setHideSearchBtn, setPageName } = useContext(SearchbarContext);

  useEffect(() => {
    setHideSearchBtn(false);
    setPageName('Explorar');
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
