import React from 'react';
import { useHistory } from 'react-router-dom';
import { string, number } from 'prop-types';

function IngredientCards({
  index, thumbnail, name, key, param }) {
  const history = useHistory();
  // function handleExploreDirection() {
  //   history.push(`/${param}`);
  // }
  return (
    <button type="button" onClick={ () => history.push(param) }>
      <div key={ key } data-testid={ `${index}-ingredient-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ thumbnail }
          alt={ name }
          index={ index }
        />
        <h4
          key={ index }
          data-testid={ `${index}-card-name` }
        >
          { name }
        </h4>
      </div>
    </button>
  );
}

IngredientCards.propTypes = {
  index: number,
  thumbnail: string,
  name: string,
}.isRequired;

export default IngredientCards;
