import { object } from 'prop-types';
import React from 'react';
import Button from 'react-bootstrap/Button';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { btn } from '../styles/login';

const indexMock = 0;

function DetalhesBebida({ props: { drinks } }) {
  const handleClick = (e) => {
    e.preventDefault();
  };

  console.log(drinks);

  const {
    strAlcoholic,
    strCategory,
    strInstructions,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strDrinkThumb,
  } = drinks[0];

  const ingredients = [
    strIngredient1,
    strIngredient2,
    strIngredient3,
  ];

  return (
    <>
      <img alt="Produto" data-testid="recipe-photo" src={ strDrinkThumb } />

      <h2 data-testid="recipe-title">{ strAlcoholic }</h2>

      <div>
        <button type="button" data-testid="share-btn">
          <img alt="Share link" src={ shareIcon } />
        </button>
        <button type="button" data-testid="favorite-btn">
          <img alt="Favorite button" src={ whiteHeartIcon } />
        </button>
      </div>

      <p data-testid="recipe-category">{ strCategory }</p>

      <ul>
        { ingredients.map((igredient, index) => (
          <li
            key={ igredient }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { igredient }
          </li>))}
        {/* Map aqui */}
      </ul>

      <p data-testid="instructions">{ strInstructions }</p>

      {/* <div data-testid={ `${index}-recomendation-card` }>
        Card Receitas Recomendadas
      </div> */}

      <div data-testid={ `${indexMock}-recomendation-card` }>
        Card Receitas Recomendadas
      </div>

      <Button
        variant="success"
        type="button"
        onClick={ handleClick }
        data-testid="start-recipe-btn"
        className={ btn }
      >
        Start recipe
      </Button>
    </>
  );
}

DetalhesBebida.propTypes = {
  props: object,
}.isRequired;

export default DetalhesBebida;
