import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function ExploreFoods() {
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
          <a
            href="/explorar/comidas/me-surpreenda"
          >
            <h2>Me Surpreenda!</h2>
          </a>
        </section>
      </section>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
