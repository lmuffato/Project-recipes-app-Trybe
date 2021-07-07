import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Explore() {
  const { push } = useHistory();

  const redirectToExplore = (type) => push(`/explorar/${type}`);

  return (
    <div>
      <Header title="Explorar" />

      <button
        onClick={ () => redirectToExplore('comidas') }
        type="button"
        data-testid="explore-food"
      >
        Explorar Comidas
      </button>
      <button
        onClick={ () => redirectToExplore('bebidas') }
        type="button"
        data-testid="explore-drinks"
      >
        Explorar Bebidas
      </button>

      <Footer />
    </div>
  );
}
