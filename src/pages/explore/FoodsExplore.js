import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import BottomMenu from '../../components/bottomMenu';

export default function FoodsExplore() {
  const history = useHistory();

  const handleRandom = async () => {
    const endPoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const response = await fetch(endPoint);
    const data = await response.json();
    const { meals: [{ idMeal }] } = data;
    history.push(`/comidas/${idMeal}`);
  };

  return (
    <div>
      <Header title="Explorar Comidas" show={ false } />

      <div className="buttonsExplore">
        <Link to="/explorar/comidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>

        <Link to="/explorar/comidas/area">
          <button
            type="button"
            data-testid="explore-by-area"
          >
            Por Local de Origem
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
