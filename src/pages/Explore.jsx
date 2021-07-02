import React from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router';
import Header from '../components/Header';

export default function Explore() {
  const history = useHistory();
  const handleClick = ({ target }) => {
    const { name } = target;
    if (name === 'foodButton') {
      history.push('/explorar/comidas');
    } else {
      history.push('/explorar/bebidas');
    }
  };

  return (
    <div>
      <Header>
        <h1 data-testid="page-title">Explorar</h1>
      </Header>
      <Button
        variant="dark"
        data-testid="explore-food"
        name="foodButton"
        onClick={ handleClick }
      >
        Explorar Comidas
      </Button>
      <Button
        variant="dark"
        data-testid="explore-drinks"
        name="drinkButton"
        onClick={ handleClick }
      >
        Explorar Bebidas
      </Button>
    </div>
  );
}
