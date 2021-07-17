import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import RecipeFinish from '../effects/RecipeFinish';
import { getItemFromLocalStorage, setToLocalStorage } from '../services/localStorage';
import CocktailsContext from '../context/CocktailsContext';
import MealsContext from '../context/MealsContext';

const shouldRedirect = (history, globalContext, ingredient, setIngredients) => {
  const time = new Date().toLocaleString();
  const { currCocktail, currMeal } = globalContext;
  let storage = getItemFromLocalStorage('doneRecipes');
  if (!storage) storage = [];
  if (history.location.pathname.includes('bebidas')) {
    storage = [...storage, {
      id: currCocktail.idDrink,
      type: 'bebida',
      area: currCocktail.strArea ? currCocktail.strArea : '',
      category: currCocktail.strCategory ? currCocktail.strCategory : '',
      alcoholicOrNot: currCocktail.strAlcoholic ? currCocktail.strAlcoholic : '',
      name: currCocktail.strDrink,
      image: currCocktail.strDrinkThumb,
      doneDate: time.split(' ')[0],
      tags: currCocktail.strTags,
    }];
  }
  if (history.location.pathname.includes('comidas')) {
    storage = [...storage, {
      id: currMeal.idMeal,
      type: 'comida',
      area: currMeal.strArea ? currMeal.strArea : '',
      category: currMeal.strCategory ? currMeal.strCategory : '',
      alcoholicOrNot: currMeal.strAlcoholic ? currMeal.strAlcoholic : '',
      name: currMeal.strMeal,
      image: currMeal.strMealThumb,
      doneDate: time.split(' ')[0],
      tags: currMeal.strTags,
    }];
  }
  setToLocalStorage('doneRecipes', storage);
  setIngredients({ ...ingredient, redirect: true });
};

export default function FinishButton({ ingredients }) {
  const { currCocktail } = useContext(CocktailsContext);
  const { currMeal } = useContext(MealsContext);
  const globalContext = { currCocktail, currMeal };
  const history = useHistory();
  const [ingredient, setIngredients] = useState({
    currIngredientsLocal: [],
    finish: false,
    canRedirect: false,
    redirect: false,
  });

  const { finish, redirect, canRedirect } = ingredient;

  useEffect(() => {
    if (!canRedirect) return;
    shouldRedirect(history, globalContext, ingredient, setIngredients);
  }, [canRedirect]);

  RecipeFinish(ingredients, ingredient, setIngredients);
  if (redirect) return <Redirect to="/receitas-feitas" />;
  return (
    <Button
      className="fixed-bottom"
      variant="dark"
      data-testid="finish-recipe-btn"
      onClick={ () => setIngredients({ ...ingredient, canRedirect: true }) }
      disabled={ !finish }
    >
      Finish Recipe
    </Button>
  );
}

FinishButton.propTypes = {
  ingredients: PropTypes.array,
}.isRequired;
