import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { fetchRandomFood } from '../hooks/useFetchRandom';
import logoIcon from '../images/savory-6.svg';
import Container from '../styles/explore';

function ExploreFoods() {
  const history = useHistory();
  const handleRandom = async () => {
    const idRandomFood = await fetchRandomFood();
    history.push(`/comidas/${idRandomFood}`);
  };
  return (
    <div>
      <Header heading="Explorar Comidas" logoSrc={ logoIcon } />
      <Container>
        <section data-testid="explore-by-ingredient" className="explore-btn">
          <a
            href="/explorar/comidas/ingredientes"
          >
            <h2>Por Ingredientes</h2>
          </a>
        </section>
        <section data-testid="explore-by-area" className="explore-btn">
          <a
            href="/explorar/comidas/area"
          >
            <h2>Por Local de Origem</h2>
          </a>
        </section>
        <section data-testid="explore-surprise" className="surprise-btn">
          <Link
            to="/explorar/bebidas/me-surpreenda"
            onClick={ handleRandom }
          >
            <h2>Me Surpreenda!</h2>
          </Link>
        </section>
      </Container>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
