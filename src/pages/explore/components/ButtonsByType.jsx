import React from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router-dom';

function ButtonsByType({ type }) {
  const history = useHistory();
  function handleExploreDirection(direction) {
    history.push(`${type}/${direction}`);
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
            onClick={ () => handleExploreDirection('Origem') }
          >
            Por Local de Origem
          </button>
        )}

      <button
        data-testid="explore-surprise"
        type="button"
        // onClick={ () => handleExploreDirection(type) }
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
