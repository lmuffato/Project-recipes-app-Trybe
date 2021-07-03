import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function ButtonExplore({ type }) {
  const history = useHistory();

  const [randomDrinkId, setRandomDrinkId] = useState();
  const [randomMealId, setRandomMealId] = useState();

  function handleDirection(direction) {
    history.push(`${type}/${direction}`);
  }

  const urlDrink = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  async function fetchRandomDrinks() {
    const response = await fetch(urlDrink);
    const drinks = await response.json();
    return drinks;
  }

  useEffect(() => {
    fetchRandomDrinks().then((results) => setRandomDrinkId(results.drinks[0].idDrink));
  }, []);
  const urlMeal = 'https://www.themealdb.com/api/json/v1/1/random.php';
  async function fetchRandomMeal() {
    const response = await fetch(urlMeal);
    const meals = await response.json();
    return meals;
  }

  useEffect(() => {
    fetchRandomMeal().then((results) => setRandomMealId(results.meals[0].idMeal));
  }, []);

  function drinkOrMeal() {
    if (history.location.pathname.includes('bebidas')) return `/bebidas/${randomDrinkId}`;
    return `/comidas/${randomMealId}`;
  }

  return (
    <div>
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => handleDirection('ingredientes') }
      >
        Por Ingredientes
      </button>
      {type === 'comidas'
        && (
          <button
            data-testid="explore-by-area"
            type="button"
            onClick={ () => handleDirection('area') }
          >
            Por Local de Origem
          </button>
        )}
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ () => history.push(drinkOrMeal()) }
      >
        Me Surpreenda!
      </button>
    </div>
  );
}
ButtonExplore.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ButtonExplore;

// Referências:
// Componente feito com o auxílio do Guilherme Dornelles
