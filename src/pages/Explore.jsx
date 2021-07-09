import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function Explore() {
  return (
    <div>
      <Header heading="Explorar" />
      <section>
        <section data-testid="explore-food">
          <a
            href="/explorar/comidas"
          >
            <h2>Explorar Comidas</h2>
          </a>
        </section>
        <section data-testid="explore-drinks">
          <a
            href="/explorar/bebidas"
          >
            <h2>Explorar Bebidas</h2>
          </a>
        </section>
      </section>
      <Footer />
    </div>
  );
}

export default Explore;
