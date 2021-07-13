import React from 'react';
import { string, number } from 'prop-types';
import './ingredientCard.css';

function IngredientCard({ index, thumbnail, name }) {
  console.log(thumbnail);
  return (
    <div
      data-testid={ `${index}-ingredient-card` }
      className="ingredientCard__container"
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ thumbnail }
        alt={ `${name} ingredient` }
        className="ingredientCard__img"
      />
      <h2
        data-testid={ `${index}-card-name` }
        className="ingredientCard__title"
      >
        {name}
      </h2>
    </div>
  );
}

IngredientCard.propTypes = {
  index: number.isRequired,
  thumbnail: string.isRequired,
  name: string.isRequired,
};

export default IngredientCard;
