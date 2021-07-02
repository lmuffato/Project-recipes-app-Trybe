import React from 'react';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';

export default function ExploreFood() {
  return (
    <div>
      <Header>
        <h1 data-testid="page-title">Explorar Comidas</h1>
      </Header>
      <Button
        variant="dark"
        data-testid="explore-by-ingredient"
        name="ingredient"
      >
        Por Ingredientes
      </Button>
      <Button
        variant="dark"
        data-testid="explore-by-area"
        name="area"
      >
        Por Local de Origem
      </Button>
      <Button
        variant="dark"
        data-testid="explore-surprise"
        name="ingredient"
      >
        Me Surpreenda!
      </Button>
    </div>
  );
}
