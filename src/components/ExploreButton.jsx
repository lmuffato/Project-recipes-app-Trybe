import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import context from '../store/Context';

function ExploreButton({ type }) {
  const { randomDrinkId, randomMealId } = useContext(context);
  const history = useHistory();

  function handleDirection(direction) {
    history.push(`${type}/${direction}`);
  }

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
ExploreButton.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ExploreButton;

// Referências:
// Componente feito com o auxílio do Guilherme Dornelles.
