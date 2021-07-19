import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import logoIcon from '../images/savory-6.svg';
import Container from '../styles/explore';

function Explore() {
  return (
    <div>
      <Header heading="Explorar" logoSrc={ logoIcon } />
      <Container>
        <section data-testid="explore-food" className="explore-btn">
          <a
            href="/explorar/comidas"
          >
            <h2>Explorar Comidas</h2>
          </a>
        </section>
        <section data-testid="explore-drinks" className="explore-btn">
          <a
            href="/explorar/bebidas"
          >
            <h2>Explorar Bebidas</h2>
          </a>
        </section>
      </Container>
      <Footer />
    </div>
  );
}

export default Explore;
