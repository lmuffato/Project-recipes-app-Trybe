import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRandomDrink } from '../../services/fetchRecipes';

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
    <div className="container">
      <Link to="/explorar/bebidas/ingredientes">
        <button
          className="myButton"
          data-testid="explore-by-ingredient"
          type="button"
        >
          Por Ingredientes
        </button>
      </Link>

      <Link to={ `/bebidas/${idDrink}` }>
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

export default ExploreDrink;
