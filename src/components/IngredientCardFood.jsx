import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'react-bootstrap';

export default function IngredientCardFood({
  ingredient: { strIngredient, idIngredient },
  index,
  selector,
}) {
  return (
    <Card
      id={ idIngredient }
      className="ingredientCard"
      style={ { width: '150px' } }
      onClick={ () => selector(strIngredient) }
      data-testid={ `${index}-ingredient-card` }
    >
      <Card.Img
        src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
        alt={ `imagem de ${strIngredient}` }
        data-testid={ `${index}-card-img` }
      />
      <Card.Body>
        <Card.Text data-testid={ `${index}-card-name` }>{ strIngredient }</Card.Text>
      </Card.Body>
    </Card>
  );
}

IngredientCardFood.propTypes = {
  ingredient: PropTypes.objectOf(PropTypes.string),
  index: PropTypes.number,
}.isRequired;
