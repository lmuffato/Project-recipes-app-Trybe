import React from 'react';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Pages Css/Explore.css';

function Explore() {
  return (
    <>
      <Header props={ { search: false, title: 'Explorar' } } />
      <main className="main-container">
        <section className="main-explore">
          <Button
            variant="light"
            size="lg"
            className="buttons"
            data-testid="explore-food"
          >
            Explorar Comidas
          </Button>
          <Button
            variant="light"
            size="lg"
            className="buttons"
            data-testid="explore-drinks"
          >
            Explorar Bebidas
          </Button>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Explore;
