import React from 'react';
import { string, number } from 'prop-types';

function IngredientCards({
  index, thumbnail, name, key }) {
  return (
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
  );
}

IngredientCards.propTypes = {
  index: number,
  thumbnail: string,
  name: string,
}.isRequired;

export default IngredientCards;
