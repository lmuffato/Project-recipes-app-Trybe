import React from 'react';
import { string } from 'prop-types';

function ItemCard({ name, image, dataTestId }) {
  return (
    <div data-testid={ `${dataTestId}-recipe-card` }>
      <h2 data-testid={ `${dataTestId}-card-name` }>{name}</h2>
      <img
        width="200"
        data-testid={ `${dataTestId}-card-img` }
        src={ image }
        alt={ name }
      />
    </div>
  );
}

ItemCard.propTypes = {
  name: string.isRequired,
  image: string.isRequired,
  dataTestId: string.isRequired,
};
export default ItemCard;
