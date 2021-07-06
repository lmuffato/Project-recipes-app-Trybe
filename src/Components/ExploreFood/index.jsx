import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRandomMeal } from '../../services/fetchRecipes';

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
    <div className="container">
      <Link to="/explorar/comidas/ingredientes">
        <button
          className="myButton"
          data-testid="explore-by-ingredient"
          type="button"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          className="myButton"
          data-testid="explore-by-area"
          type="button"
        >
          Por Local de Origem
        </button>
      </Link>
      <Link to={ `/comidas/${idMeal}` }>
        <button
          className="myButton"
          data-testid="explore-surprise"
          type="button"
        >
          Me Surpreenda!
        </button>
      </Link>
    </div>
  );
}

export default ExploreFood;
