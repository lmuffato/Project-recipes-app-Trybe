import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useExploreRecipe from '../hooks/useExploreRecipe';

export default function FoodExplore() {
  const { redirectToExplore, redirectToSurprise } = useExploreRecipe('meal');

  return (
    <div>
      <Header title="Explorar Comidas" />
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => redirectToExplore('ingredientes') }
      >
        Por Ingredientes
      </button>

      <button
        data-testid="explore-by-area"
        type="button"
        onClick={ () => redirectToExplore('area') }
      >
        Por Local de Origem
      </button>

      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ () => redirectToSurprise('comidas') }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}
