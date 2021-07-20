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
      <main className="main-explore">
        <Link to="/explorar/comidas">
          <button
            type="button"
            data-testid="explore-food"
            className="button explore-button"
          >
            Explorar Comidas
          </button>
        </Link>

        <Link to="/explorar/bebidas">
          <button
            type="button"
            data-testid="explore-drinks"
            className="button explore-button"
          >
            Explorar Bebidas
          </button>
        </Link>
      </main>
      <Footer />
    </>
  );
}

export default Explore;
