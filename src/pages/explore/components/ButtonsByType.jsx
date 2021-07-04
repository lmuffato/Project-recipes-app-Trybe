import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router-dom';

function ButtonsByType({ type }) {
  console.log(type);
  const history = useHistory();
  const [randomDrinkId, setRandomDrinkId] = useState();
  const [randomMealId, setRandomMealId] = useState();
  console.log(randomDrinkId);
  console.log(randomMealId);

  console.log(history);
  function handleExploreDirection(direction) {
    history.push(`${type}/${direction}`);
  }

  const randomDrink = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  async function fetchApiRandomDrinks() {
    const response = await fetch(randomDrink);
    const { drinks } = await response.json();
    return drinks;
  }
  useEffect(() => {
    fetchApiRandomDrinks().then((results) => setRandomDrinkId(results[0].idDrink));
  }, []);

  const randomMeal = 'https://www.themealdb.com/api/json/v1/1/random.php';
  async function fetchApiRandomMeal() {
    const response = await fetch(randomMeal);
    const { meals } = await response.json();
    return meals;
  }
  useEffect(() => {
    fetchApiRandomMeal().then((results) => setRandomMealId(results[0].idMeal));
  }, []);

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

// References: https://reactrouter.com/web/api/Hooks
