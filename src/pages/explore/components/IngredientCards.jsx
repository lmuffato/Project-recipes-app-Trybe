import React from 'react';
import { string, number } from 'prop-types';

function IngredientCards({
  datatestid, index, thumbnail, name, datatestidCard, datatestidCardImg }) {
  return (
    <div data-testid={ datatestid }>
      <img
        data-testid={ datatestidCardImg }
        src={ thumbnail }
        alt={ name }
        index={ index }
        key={ index }
      />
      <h4
        key={ index }
        data-testid={ datatestidCard }
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
