import React from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router';
import Header from '../components/Header';

export default function ExploreFood() {
  const history = useHistory();
  const handleClick = ({ target }) => {
    const { name } = target;
    if (name === 'ingredient') {
      history.push('/explorar/comidas/ingredientes');
    }
  };
  return (
    <div>
      <Header>
        <h1 data-testid="page-title">Explorar Comidas</h1>
      </Header>
      <Button
        variant="dark"
        data-testid="explore-by-ingredient"
        name="ingredient"
        onClick={ handleClick }
      >
        Por Ingredientes
      </Button>
      <Button
        variant="dark"
        data-testid="explore-by-area"
        name="area"
        onClick={ handleClick }
      >
        Por Local de Origem
      </Button>
      <Button
        variant="dark"
        data-testid="explore-surprise"
        name="surprise"
        onClick={ handleClick }
      >
        Me Surpreenda!
      </Button>
    </div>
  );
}
