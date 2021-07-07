import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import FavoriteButton from '../components/FavoriteButton';
import IngredientsChecks from '../components/IngredientsChecks';
import ShareButton from '../components/ShareButton';
import RecipeDetail from '../effects/RecipeDetails';
import { ApiDetailsById } from '../services/theCockTailAPI';
import { ApiFirstsResults } from '../services/theMealAPI';

export default function DrinkInProgress() {
  const [currDrink, setCurrDrink] = useState({
    recipe: {},
    recomends: [],
    arrRecipeIngredients: [],
    arrRecipeMeasureUnit: [],
    doneRecipe: false,
    inProgress: false,
    recipeInit: false,
  });
  RecipeDetail(currDrink, ApiDetailsById, ApiFirstsResults, setCurrDrink);

  const { arrRecipeIngredients,
    recipe } = currDrink;

  return (
    <Card style={ { width: '18rem' } }>
      <img
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{recipe.strDrink}</h2>
      <ShareButton />
      <FavoriteButton recipe={ recipe } />
      <h3 data-testid="recipe-category">{recipe.strAlcoholic}</h3>
      <IngredientsChecks ingredients={ arrRecipeIngredients } />
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <Button
        className="fixed-bottom"
        variant="dark"
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </Button>
    </Card>
  );
}
