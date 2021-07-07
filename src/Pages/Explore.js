import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../PagesCss/Explore.css';

function Explore() {
  const history = useHistory();
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
            onClick={ () => history.push('/explorar/comidas') }
          >
            Explorar Comidas
          </Button>
          <Button
            variant="light"
            size="lg"
            className="buttons"
            data-testid="explore-drinks"
            onClick={ () => history.push('/explorar/bebidas') }
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
