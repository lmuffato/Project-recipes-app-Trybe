import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useIngredients from '../../hooks/useIngredients';
import {
  ContainerExploreByIngredients,
  MainContainerIngredientsCards,
} from '../../styles/shared/ByIngredients/ByIngredientsStyles';

export default function FoodIngredientExplore() {
  const { renderCards } = useIngredients('drink');

  return (
    <div>
      <ContainerExploreByIngredients>
        <Header title="Explorar Ingredientes de Bebidas" />

        <MainContainerIngredientsCards>
          {renderCards()}
        </MainContainerIngredientsCards>
      </ContainerExploreByIngredients>
      <Footer explore />
    </div>
  );
}
