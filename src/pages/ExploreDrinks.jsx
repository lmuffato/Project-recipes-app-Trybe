import React from 'react';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';

export default function ExploreDrinks() {
  return (
    <div>
      <Header>
        <h1 data-testid="page-title">Explorar Bebidas</h1>
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
        data-testid="explore-surprise"
        name="ingredient"
      >
        Me Surpreenda!
      </Button>
    </div>
  );
}
