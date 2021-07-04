import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { fetchApiRandomDrinks, fetchApiRandomMeal } from '../../../services/fetchApi';

function ButtonsByType({ type }) {
  const history = useHistory();
  const [randomDrinkId, setRandomDrinkId] = useState();
  const [randomMealId, setRandomMealId] = useState();

  useEffect(() => {
    fetchApiRandomMeal().then((res) => setRandomMealId(res[0].idMeal));
    fetchApiRandomDrinks().then((res) => setRandomDrinkId(res[0].idDrink));
  }, []);

  function handleExploreDirection(direction) {
    history.push(`${type}/${direction}`);
  }

  function randomDrinkMeal() {
    if (type === 'bebidas') return `/bebidas/${randomDrinkId}`;
    return `/comidas/${randomMealId}`;
  }

  return (
    <div>
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => handleExploreDirection('ingredientes') }
      >
        Por Ingredientes
      </button>
      {type === 'comidas'
        && (
          <button
            data-testid="explore-by-area"
            type="button"
            onClick={ () => handleExploreDirection('area') }
          >
            Por Local de Origem
          </button>
        )}
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ () => history.push(randomDrinkMeal()) }
      >
        Me Surpreenda!
      </button>
    </div>
  );
}

ButtonsByType.propTypes = {
  type: string,
}.isRequired;

export default ButtonsByType;
