import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { getRandomMeal } from '../../services/fetchRecipes';
import Header from '../Header';
import './styles.css';

function ExploreFood() {
  const [idMeal, setIdMeal] = useState('');

  function randomMeal() {
    getRandomMeal().then((response) => {
      setIdMeal(response.idMeal);
    });
  }

  useEffect(() => {
    randomMeal();
  }, []);

  return (
    <section>
      <Header>Explorar Comidas</Header>
      <div className="container">
        <Link to="/explorar/comidas/ingredientes">
          <Button
            className="myButton btn-lg btn-warning"
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
          </Button>
        </Link>
        <Link to="/explorar/comidas/area">
          <Button
            className="myButton btn-lg btn-warning"
            data-testid="explore-by-area"
            type="button"
          >
            Por Local de Origem
          </Button>
        </Link>
        <Link to={ `/comidas/${idMeal}` }>
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

export default ExploreFood;
