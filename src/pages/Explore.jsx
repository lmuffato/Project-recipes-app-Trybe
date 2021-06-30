import React from 'react';
import Header from '../components/Header/Header';

function Explore() {
  return (
    <div>
      <Header>
        <h2 data-testid="page-title">Explorar</h2>
      </Header>
      <section>
        <button type="button" data-testid="explore-food">
          <h2>Explorar Comidas</h2>
        </button>
        <button type="button" data-testid="explore-drinks">
          <h2>Explorar Bebidas</h2>
        </button>
      </section>
    </div>
  );
}

export default Explore;
