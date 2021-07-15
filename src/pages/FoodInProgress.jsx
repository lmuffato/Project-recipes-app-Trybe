import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import RecipeDetail from '../effects/RecipeDetails';
import { ApiCocktailFirstItems } from '../services/theCockTailAPI';
import { ApiRecipeDetail } from '../services/theMealAPI';
import FavoriteButton from '../components/FavoriteButton';
import IngredientsChecks from '../components/IngredientsChecks';
import ShareButton from '../components/ShareButton';
import FinishButton from '../components/FinishButton';
import '../CSS/InProgressRecipe.css';

export default function FoodInProgress() {
  const [currMeal, setCurrMeal] = useState({
    recipe: {},
    recomends: [],
    arrRecipeIngredients: [],
    arrRecipeMeasureUnit: [],
    doneRecipe: false,
    inProgress: false,
    recipeInit: false,
  });

  RecipeDetail(currMeal, ApiRecipeDetail, ApiCocktailFirstItems, setCurrMeal);

  const { recipe, arrRecipeIngredients } = currMeal;
  return (
    <Card className="inProgressCard">
      <img
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        data-testid="recipe-photo"
      />
      <div className="inProgressHeader">
        <div className="titleDiv">
          <h2 data-testid="recipe-title">{recipe.strMeal}</h2>
          <h3 data-testid="recipe-category">{recipe.strCategory}</h3>
        </div>
        <div className="buttonsInProgress">
          <ShareButton />
          <FavoriteButton recipe={ recipe } />
        </div>
      </div>
      <div className="ingredientsChecksDiv">
        <IngredientsChecks ingredients={ arrRecipeIngredients } />
      </div>
      <p className="instructionsProgress" data-testid="instructions">{ recipe.strInstructions }</p>
      <FinishButton ingredients={ arrRecipeIngredients } />
    </Card>
  );
}
