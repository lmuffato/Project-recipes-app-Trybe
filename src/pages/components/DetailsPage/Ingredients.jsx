import { arrayOf, string } from 'prop-types';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Ingredients(props) {
  const { recipe } = props;
  const recipeKeys = Object.keys(recipe);
  const ingredients = recipeKeys.filter((key) => key.includes('Ingredient'));
  const measures = recipeKeys.filter((key) => key.includes('Measure'));

  return (
    <Container>
      <h2>Ingredients</h2>
      { ingredients.map((ingredient, index) => (
        <Row key={ ingredient } data-testid={ `${index}-ingredient-name-and-measure` }>
          { recipe[measures[index]] }
          { recipe[ingredient] }
        </Row>
      )) }
    </Container>
  );
}

Ingredients.propTypes = {
  ingredients: arrayOf(string),
}.isRequired;

export default Ingredients;
