import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'react-bootstrap';

export default function AreaCards({
  strMeal,
  strMealThumb,
  index,
}) {
  return (
    <Card
      id={ index }
      className="ingredientCard"
      style={ { width: '150px' } }
      data-testid={ `${index}-recipe-card` }
    >
      <Card.Img
        src={ strMealThumb }
        alt={ `imagem de ${strMeal}` }
        data-testid={ `${index}-card-img` }
      />
      <Card.Body>
        <Card.Text data-testid={ `${index}-card-name` }>{ strMeal }</Card.Text>
      </Card.Body>
    </Card>
  );
}

AreaCards.propTypes = {
  strMeal: PropTypes.string,
  strMealThumb: PropTypes.string,
  index: PropTypes.number,
}.isRequired;
