import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { fetchRandomFood } from '../hooks/useFetchRandom';

function ExploreFoods() {
  const history = useHistory();
  const handleRandom = async () => {
    const idRandomFood = await fetchRandomFood();
    history.push(`/comidas/${idRandomFood}`);
  };
  return (
    <div>
      <Header>
        <h2 data-testid="page-title">Explorar Comidas</h2>
      </Header>
      <section>
        <section data-testid="explore-by-ingredient">
          <a
            href="/explorar/comidas/ingredientes"
          >
            <h2>Por Ingredientes</h2>
          </a>
        </section>
        <section data-testid="explore-by-area">
          <a
            href="/explorar/comidas/area"
          >
            <h2>Por Local de Origem</h2>
          </a>
        </section>
        <section data-testid="explore-surprise">
          <Link
            href="/explorar/comidas/me-surpreenda"
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

export default ExploreFoods;
