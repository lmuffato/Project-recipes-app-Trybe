import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'react-bootstrap';

export default function IngredientCardDrinks({
  ingredient: { strIngredient1 },
  index,
  selector,
}) {
  return (
    <Card
      id={ index }
      className="ingredientCard"
      style={ { width: '150px' } }
      onClick={ () => selector(strIngredient1) }
      data-testid={ `${index}-ingredient-card` }
    >
      <Card.Img
        src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
        alt={ `imagem de ${strIngredient1}` }
        data-testid={ `${index}-card-img` }
      />
      <Card.Body>
        <Card.Text data-testid={ `${index}-card-name` }>{ strIngredient1 }</Card.Text>
      </Card.Body>
    </Card>
  );
}

IngredientCardDrinks.propTypes = {
  ingredient: PropTypes.objectOf(PropTypes.string),
  index: PropTypes.number,
}.isRequired;
