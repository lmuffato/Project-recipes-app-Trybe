import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import RecipeDetail from '../effects/RecipeDetails';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import { ApiDetailsById } from '../services/theCockTailAPI';
import { ApiFirstsResults } from '../services/theMealAPI';

export default function DrinkDetails() {
  const history = useHistory();
  const { pathname } = history.location;
  const [currDrink, setCurrDrink] = useState({
    recipe: {},
    recomends: [],
    arrRecipeIngredients: [],
    arrRecipeMeasureUnit: [],
  });
  RecipeDetail(pathname, ApiDetailsById, ApiFirstsResults, setCurrDrink);
  if (!currDrink.recipe) return;
  const { arrRecipeIngredients, arrRecipeMeasureUnit,
    recipe, recomends } = currDrink;
  return (
    <Card style={ { width: '18rem' } }>
      <h2 data-testid="recipe-title">{recipe.strMeal}</h2>
      <img
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        data-testid="recipe-photo"
      />
      <img
        style={ { width: '2rem' } }
        data-testid="share-btn"
        src={ shareIcon }
        alt="compartilhar"
      />
      <img
        style={ { width: '2rem' } }
        data-testid="favorite-btn"
        src={ favoriteIcon }
        alt="favoritar"
      />
      <h3 data-testid="recipe-category">{recipe.strCategory}</h3>
      <h3>Ingredientes:</h3>
      {arrRecipeIngredients.map((ingredient, index) => {
        if (!ingredient[1]) return;
        return (
          <p
            key={ `${index}-${ingredient[1]}` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingredient[1]}: `}
            <span>{arrRecipeMeasureUnit[index][1]}</span>
          </p>
        );
      })}
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      {recipe.strYoutube ? <iframe
        title={ recipe.strMeal }
        width="240"
        height="120"
        data-testid="video"
        src={ recipe.strYoutube }
      /> : null}
      <h4>Pratos Recomendados:</h4>
      {recomends.map((item, index) => (
        <img
          key={ item.strMeal }
          src={ item.strMealThumb }
          alt={ item.strMeal }
          data-testid={ `${index}-recomendation-card` }
        />
      ))}
      <button type="button" data-testid="start-recipe-btn">Começar Receita</button>
    </Card>
  );
}
