import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import RecipeFinish from '../effects/RecipeFinish';
import CocktailsContext from '../context/CocktailsContext';

export default function FinishButton({ ingredients }) {
  const history = useHistory();
  const { pathname } = history.location;
  const { currIngredients, currMealsIngredients } = useContext(CocktailsContext);
  const [ingredient, setIngredients] = useState({
    currIngredientsLocal: [],
    finish: false,
    disable: false,
  });

  RecipeFinish(ingredients, ingredient, setIngredients);
  const { finish, currIngredientsLocal, disable } = ingredient;

  const equal = () => {
    if (pathname.includes('bebidas') && currIngredients.length === ingredients.length) {
      setIngredients({ ...ingredient, disable: true });
    }
    if (!currMealsIngredients) return;
    if (currMealsIngredients.length === ingredients.length) {
      setIngredients({ ...ingredient, disable: true });
    }
  };

  useEffect(() => {
    equal();
  }, [currMealsIngredients, currIngredients]);
  return (
    <Button
      className="fixed-bottom"
      variant="dark"
      data-testid="finish-recipe-btn"
      onClick={ () => console.log('clicou') }
      disabled={ !finish && !disable }
    >
      Finish Recipe
    </Button>
  );
}

FinishButton.propTypes = {
  ingredients: PropTypes.array,
}.isRequired;
