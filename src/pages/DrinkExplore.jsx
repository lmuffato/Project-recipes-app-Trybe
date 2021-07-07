import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useExploreRecipe from '../hooks/useExploreRecipe';

export default function DrinkExplore() {
  const { redirectToExplore, redirectToSurprise } = useExploreRecipe('drink');

  return (
    <div>
      <Header title="Explorar Bebidas" />

      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => redirectToExplore('ingredientes') }
      >
        Por Ingredientes
      </button>

      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ () => redirectToSurprise('bebidas') }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}
