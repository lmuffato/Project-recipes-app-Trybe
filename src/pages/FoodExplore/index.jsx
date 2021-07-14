import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useExploreRecipe from '../../hooks/useExploreRecipe';
import { ContainerExploreFood, ButtonFoodExplore } from './styles';

export default function FoodExplore() {
  const { redirectToExplore, redirectToSurprise } = useExploreRecipe('meal');

  return (
    <div>
      <ContainerExploreFood>
        <Header title="Explorar Comidas" />
        <div>
          <ButtonFoodExplore
            data-testid="explore-by-ingredient"
            type="button"
            onClick={ () => redirectToExplore('ingredientes') }
          >
            Por Ingredientes
          </ButtonFoodExplore>

          <ButtonFoodExplore
            data-testid="explore-by-area"
            type="button"
            onClick={ () => redirectToExplore('area') }
          >
            Por Local de Origem
          </ButtonFoodExplore>

          <ButtonFoodExplore
            data-testid="explore-surprise"
            type="button"
            onClick={ () => redirectToSurprise('comidas') }
          >
            Me Surpreenda!
          </ButtonFoodExplore>
        </div>
      </ContainerExploreFood>
      <Footer explore />
    </div>
  );
}
