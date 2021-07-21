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
    <Container className="details-ingredients">
      <h1 className="details-ingredient-title">Ingredients</h1>
      <div className="details-ingredient-list">
        { ingredients.map((ingredient, index) => (
          <Row
            key={ ingredient }
            className="details-ingredient"
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { recipe[measures[index]] }
            { ' ' }
            { recipe[ingredient] }
          </Row>
        )) }
      </div>
    </Container>
  );
}

Ingredients.propTypes = {
  ingredients: arrayOf(string),
}.isRequired;

export default Ingredients;
