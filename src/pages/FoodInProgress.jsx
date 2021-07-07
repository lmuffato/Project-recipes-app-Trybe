import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import RecipeDetail from '../effects/RecipeDetails';
import { ApiCocktailFirstItems } from '../services/theCockTailAPI';
import { ApiRecipeDetail } from '../services/theMealAPI';
import RecipeShared from '../effects/RecipeShared';
import FavoriteButton from '../components/FavoriteButton';
import IngredientsChecks from '../components/IngredientsChecks';
import ShareButton from '../components/ShareButton';

export default function FoodInProgress() {
  const [currMeal, setCurrMeal] = useState({
    recipe: {},
    recomends: [],
    arrRecipeIngredients: [],
    arrRecipeMeasureUnit: [],
    doneRecipe: false,
    inProgress: false,
    recipeInit: false,
    shareRecipe: false,
  });

  RecipeDetail(currMeal, ApiRecipeDetail, ApiCocktailFirstItems, setCurrMeal);
  RecipeShared(currMeal.shareRecipe);

  const { recipe, arrRecipeIngredients } = currMeal;
  return (
    <Card style={ { width: '18rem' } }>
      <img
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{recipe.strMeal}</h2>
      <ShareButton />
      <FavoriteButton recipe={ recipe } />
      <h3 data-testid="recipe-category">{recipe.strCategory}</h3>
      <IngredientsChecks ingredients={ arrRecipeIngredients } />
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <Button
        variant="dark"
        className="fixed-bottom"
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </Button>
    </Card>
  );
}
