import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { fetchRandomDrink } from '../hooks/useFetchRandom';

function ExploreDrinks() {
  const history = useHistory();
  const handleRandom = async () => {
    const idRandomDrink = await fetchRandomDrink();
    history.push(`/bebidas/${idRandomDrink}`);
  };
  return (
    <div>
      <Header>
        <h2 data-testid="page-title">Explorar Bebidas</h2>
      </Header>
      <section>
        <section data-testid="explore-by-ingredient">
          <a
            href="/explorar/bebidas/ingredientes"
          >
            <h2>Por Ingredientes</h2>
          </a>
        </section>
        <section data-testid="explore-surprise">
          <Link
            href="/explorar/bebidas/me-surpreenda"
            onClick={ handleRandom }
          >
            <h2>Me Surpreenda!</h2>
          </Link>
        </section>
      </section>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
