import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function ExploreDrinks() {
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
          <a
            href="/explorar/bebidas/me-surpreenda"
          >
            <h2>Me Surpreenda!</h2>
          </a>
        </section>
      </section>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
