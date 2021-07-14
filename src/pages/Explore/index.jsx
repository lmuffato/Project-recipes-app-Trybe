import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ContainerExplore, ButtonExplore } from './styles';

export default function Explore() {
  const { push } = useHistory();

  const redirectToExplore = (type) => push(`/explorar/${type}`);

  return (
    <div>
      <ContainerExplore>
        <Header title="Explorar" />

        <div>
          <ButtonExplore
            onClick={ () => redirectToExplore('comidas') }
            type="button"
            data-testid="explore-food"
          >
            Explorar Comidas
          </ButtonExplore>
          <ButtonExplore
            onClick={ () => redirectToExplore('bebidas') }
            type="button"
            data-testid="explore-drinks"
          >
            Explorar Bebidas
          </ButtonExplore>
        </div>
      </ContainerExplore>

      <Footer explore />
    </div>
  );
}
