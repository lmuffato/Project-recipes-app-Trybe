import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import BottomMenu from '../../components/bottomMenu';

export default function DrinksExplore() {
  const history = useHistory();

  const handleRandom = async () => {
    const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const response = await fetch(endPoint);
    const data = await response.json();
    const { drinks: [{ idDrink }] } = data;
    history.push(`/bebidas/${idDrink}`);
  };

  return (
    <div>
      <Header title="Explorar Bebidas" show={ false } />

      <div className="buttonsExplore">
        <Link to="/explorar/bebidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>

        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => handleRandom() }
        >
          Me Surpreenda!
        </button>
      </div>

      <BottomMenu />
    </div>
  );
}
