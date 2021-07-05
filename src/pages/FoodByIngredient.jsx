import React from 'react';
import Header from '../components/Header';
import InferiorMenu from '../components/InferiorMenu';

export default function FoodByIngredient() {
  return (
    <div>
      <Header>
        <h1 data-testid="page-title">Explorar Ingredientes</h1>
      </Header>
      <InferiorMenu />
    </div>
  );
}
