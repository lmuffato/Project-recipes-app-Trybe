import React, { useState } from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import RecipeDetail from '../effects/RecipeDetails';
import RecipeShared from '../effects/RecipeShared';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
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
    shareRecipe: false,
  });
  RecipeDetail(currDrink, ApiDetailsById, ApiFirstsResults, setCurrDrink);
  RecipeShared(currDrink.shareRecipe);

  const { arrRecipeIngredients,
    recipe, shareRecipe } = currDrink;
  return (
    <Card style={ { width: '18rem' } }>
      <img
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{recipe.strDrink}</h2>
      {shareRecipe && <span>Link copiado!</span>}
      <Image
        type="button"
        style={ { width: '2rem' } }
        data-testid="share-btn"
        src={ shareIcon }
        onClick={ () => setCurrDrink({ ...currDrink, shareRecipe: true }) }
      />
      <img
        style={ { width: '2rem' } }
        data-testid="favorite-btn"
        src={ favoriteIcon }
        alt="favoritar"
      />
      <h3 data-testid="recipe-category">{recipe.strAlcoholic}</h3>
      {arrRecipeIngredients.map((ingredient, index) => (
        <div
          key={ `${index}-${ingredient[1]}` }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            id={ ingredient[1] }
            name={ ingredient[1] }
            value={ ingredient[1] }
          />
          <label htmlFor={ ingredient[1] }>{ingredient[1]}</label>
        </div>
      ))}
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
