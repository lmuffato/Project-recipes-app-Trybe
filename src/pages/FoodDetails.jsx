import React, { useState } from 'react';
import { Card, Carousel } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import RecipeDetail from '../effects/RecipeDetails';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import { ApiCocktailFirstItems } from '../services/theCockTailAPI';
import { ApiRecipeDetail } from '../services/theMealAPI';

export default function FoodDetails() {
  const history = useHistory();
  const { pathname } = history.location;
  const [currMeal, setCurrMeal] = useState({
    recipe: {},
    recomends: [],
    arrRecipeIngredients: [],
    arrRecipeMeasureUnit: [],
    doneRecipe: false,
  });
  RecipeDetail(pathname, ApiRecipeDetail, ApiCocktailFirstItems, setCurrMeal);

  if (!currMeal.recipe) return;
  const { arrRecipeIngredients, arrRecipeMeasureUnit,
    recipe, recomends, doneRecipe } = currMeal;

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
      <iframe
        title={ recipe.strMeal }
        width="240"
        height="120"
        data-testid="video"
        src={ recipe.strYoutube }
      />
      <h4>Bebidas Recomendadas:</h4>
      <Carousel>
        {recomends.map((item, index) => (
          <Carousel.Item key={ `${index}-${item.strDrink}` }>
            <img
              className="d-block w-100"
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
              data-testid={ `${index}-recomendation-card` }
            />
            <Carousel.Caption>
              <h3 data-testid={ `${index}-recomendation-title` }>{item.strDrink}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      {!doneRecipe && (
        <button
          className="fixed-bottom"
          type="button"
          data-testid="start-recipe-btn"
        // onClick={ recipeInit }
        >
          {doneRecipe ? 'Continuar Receita' : 'Iniciar Receita'}
        </button>)}
    </Card>
  );
}
