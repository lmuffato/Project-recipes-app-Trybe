import { arrayOf, string } from 'prop-types';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function IngredientsList(props) {
  const { recipe } = props;
  const recipeKeys = Object.keys(recipe);
  const ingredients = recipeKeys.filter((key) => key.includes('Ingredient'));
  const measures = recipeKeys.filter((key) => key.includes('Measure'));

  return (
    <Container>
      <h2>Ingredients</h2>
      { ingredients.map((ingredient, index) => {
        if (!recipe[ingredient]) return null;
        return (
          <Row key={ ingredient } data-testid="ingredient-step">
            { recipe[measures[index]] }
            { ' ' }
            { recipe[ingredient] }
          </Row>
        );
      }) }
    </Container>
  );
}

IngredientsList.propTypes = {
  ingredients: arrayOf(string),
}.isRequired;

export default IngredientsList;
