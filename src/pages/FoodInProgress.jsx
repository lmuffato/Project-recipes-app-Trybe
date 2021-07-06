import React, { useState } from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import RecipeDetail from '../effects/RecipeDetails';
import { ApiCocktailFirstItems } from '../services/theCockTailAPI';
import { ApiRecipeDetail } from '../services/theMealAPI';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import RecipeShared from '../effects/RecipeShared';

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

  const { recipe, arrRecipeIngredients, shareRecipe } = currMeal;
  return (
    <Card style={ { width: '18rem' } }>
      <img
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{recipe.strMeal}</h2>
      {shareRecipe && <span>Link copiado!</span>}
      <Image
        type="button"
        style={ { width: '2rem' } }
        data-testid="share-btn"
        src={ shareIcon }
        alt="Compartilhar"
        onClick={ () => setCurrMeal({ ...currMeal, shareRecipe: true }) }
      />
      <img
        style={ { width: '2rem' } }
        data-testid="favorite-btn"
        src={ favoriteIcon }
        alt="favoritar"
      />
      <h3 data-testid="recipe-category">{recipe.strCategory}</h3>
      {arrRecipeIngredients.map((ingredient, index) => (
        <p
          key={ `${index}-${ingredient[1]}` }
          data-testid={ `${index}-ingredient-step` }
        >
          {ingredient[1]}
        </p>
      ))}
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
