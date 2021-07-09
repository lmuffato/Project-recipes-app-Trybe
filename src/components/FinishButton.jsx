import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import RecipeFinish from '../effects/RecipeFinish';

export default function FinishButton({ ingredients }) {
  const history = useHistory();
  const { pathname } = history.location;
  const [ingredient, setIngredients] = useState({
    currIngredientsLocal: [],
    finish: false,
    disable: false,
  });
  RecipeFinish(ingredients, ingredient, setIngredients);
  const { finish } = ingredient;
  console.log(ingredient);
  return (
    <Button
      className="fixed-bottom"
      variant="dark"
      data-testid="finish-recipe-btn"
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
