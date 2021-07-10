import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import RecipeFinish from '../effects/RecipeFinish';

export default function FinishButton({ ingredients }) {
  const [ingredient, setIngredients] = useState({
    currIngredientsLocal: [],
    finish: false,
    redirect: false,
  });

  const shouldRedirect = () => {
    setIngredients({ ...ingredient, redirect: true });
  };

  RecipeFinish(ingredients, ingredient, setIngredients);
  const { finish, redirect } = ingredient;
  if (redirect) return <Redirect to="/receitas-feitas" />;
  return (
    <Button
      className="fixed-bottom"
      variant="dark"
      data-testid="finish-recipe-btn"
      default
      onClick={ () => shouldRedirect() }
      disabled={ !finish }
    >
      Finish Recipe
    </Button>
  );
}

FinishButton.propTypes = {
  ingredients: PropTypes.array,
}.isRequired;
