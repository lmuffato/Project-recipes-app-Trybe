import React from 'react';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  return (
    <>
      <Header props={ { search: false, title: 'Explorar' } } />
      <main>
        <Button
          variant="primary"
          data-testid="explore-food"
        >
          Explorar Comidas
        </Button>
        <Button
          variant="primary"
          data-testid="explore-drinks"
        >
          Explorar Bebidas
        </Button>
      </main>
      <Footer />
    </>
  );
}

export default Explore;
