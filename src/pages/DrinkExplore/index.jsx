import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useExploreRecipe from '../../hooks/useExploreRecipe';
import { ContainerExploreDrink, ButtonDrinkExplore } from './styles';

export default function DrinkExplore() {
  const { redirectToExplore, redirectToSurprise } = useExploreRecipe('drink');

  return (
    <div>
      <ContainerExploreDrink>
        <Header title="Explorar Bebidas" />

        <div>
          <ButtonDrinkExplore
            data-testid="explore-by-ingredient"
            type="button"
            onClick={ () => redirectToExplore('ingredientes') }
          >
            Por Ingredientes
          </ButtonDrinkExplore>

          <ButtonDrinkExplore
            data-testid="explore-surprise"
            type="button"
            onClick={ () => redirectToSurprise('bebidas') }
          >
            Me Surpreenda!
          </ButtonDrinkExplore>
        </div>
      </ContainerExploreDrink>
      <Footer explore />
    </div>
  );
}
