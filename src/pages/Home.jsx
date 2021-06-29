import React from 'react';
import Header from '../components/Header/Header';

function Home() {
  return (
    <>
      <Header>
        <h2 data-testid="page-title">Comidas</h2>
      </Header>
      <div>
        Lista de receitas
      </div>
    </>
  );
}

export default Home;
