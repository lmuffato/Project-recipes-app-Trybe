import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import RecipeFinish from '../effects/RecipeFinish';

export default function FinishButton({ ingredients }) {
  const [ingredient, setIngredients] = useState({
    currIngredientsLocal: [],
    finish: false,
    disable: false,
  });
  RecipeFinish(ingredients, ingredient, setIngredients);
  const { finish } = ingredient;
  console.log(finish);
  return (
    <Button
      className="fixed-bottom"
      variant="dark"
      data-testid="finish-recipe-btn"
      default
      onClick={ () => console.log('clicou') }
      disabled={ !finish }
    >
      Finish Recipe
    </Button>
  );
}

FinishButton.propTypes = {
  ingredients: PropTypes.array,
}.isRequired;
