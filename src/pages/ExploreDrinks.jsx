import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { fetchRandomDrink } from '../hooks/useFetchRandom';
import logoIcon from '../images/savory-6.svg';
import Container from '../styles/explore';

function ExploreDrinks() {
  const history = useHistory();
  const handleRandom = async () => {
    const idRandomDrink = await fetchRandomDrink();
    history.push(`/bebidas/${idRandomDrink}`);
  };
  return (
    <div>
      <Header heading="Explorar Bebidas" logoSrc={ logoIcon } />
      <Container>
        <section data-testid="explore-by-ingredient" className="explore-btn">
          <a
            href="/explorar/bebidas/ingredientes"
          >
            <h2>Por Ingredientes</h2>
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

export default ExploreDrinks;
