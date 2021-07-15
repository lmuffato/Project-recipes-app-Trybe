import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import FavoriteButton from '../components/FavoriteButton';
import FinishButton from '../components/FinishButton';
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
    <Card className="inProgressCard">
      <img
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
        data-testid="recipe-photo"
      />
      <div className="inProgressHeader">
        <div className="titleDiv">
          <h2 data-testid="recipe-title">{recipe.strDrink}</h2>
          <h3 data-testid="recipe-category">{recipe.strAlcoholic}</h3>
        </div>
        <div className="buttonsInProgress">
          <ShareButton />
          <FavoriteButton recipe={ recipe } />
        </div>
      </div>
      <div className="ingredientsChecksDiv">
        <IngredientsChecks ingredients={ arrRecipeIngredients } />
      </div>
      <p
        className="instructionsProgress"
        data-testid="instructions"
      >
        { recipe.strInstructions }
      </p>
      <FinishButton ingredients={ arrRecipeIngredients } />
    </Card>
  );
}
