import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import RecipeFinish from '../effects/RecipeFinish';
import CocktailsContext from '../context/CocktailsContext';

export default function FinishButton({ ingredients }) {
  const { currIngredients } = useContext(CocktailsContext);
  const [ingredient, setIngredients] = useState({
    currIngredientsLocal: [],
    finish: false,
  });

  RecipeFinish(ingredients, ingredient, setIngredients);
  const { finish, currIngredientsLocal } = ingredient;
  const equal = currIngredients.length === ingredients.length;
  return (
    <Button
      className="fixed-bottom"
      variant="dark"
      data-testid="finish-recipe-btn"
      onClick={ () => console.log('clicou') }
      disabled={ !finish && !equal }
    >
      Finish Recipe
    </Button>
  );
}

FinishButton.propTypes = {
  ingredients: PropTypes.array,
}.isRequired;
