import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { getRandomDrink } from '../../services/fetchRecipes';
import Header from '../Header';
import './styles.css';

function ExploreDrink() {
  const [idDrink, setIdDrink] = useState('');

  function randomDrink() {
    getRandomDrink().then((response) => {
      setIdDrink(response.idDrink);
    });
  }

  useEffect(() => {
    randomDrink();
  }, []);

  return (
    <section>
      <Header>Explorar Bebidas</Header>
      <div className="container">
        <Link to="/explorar/bebidas/ingredientes">
          <Button
            className="myButton btn-lg btn-warning"
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
          </Button>
        </Link>
        <Link to={ `/bebidas/${idDrink}` }>
          <Button
            className="myButton btn-lg btn-warning"
            data-testid="explore-surprise"
            type="button"
          >
            Me Surpreenda!
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default ExploreDrink;
