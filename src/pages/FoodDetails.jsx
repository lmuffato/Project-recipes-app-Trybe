import React, { useState } from 'react';
import { Card, Carousel, Button } from 'react-bootstrap';
import FavoriteButton from '../components/FavoriteButton';
import RecipeDetail from '../effects/RecipeDetails';
import RecipeInit from '../effects/RecipeInit';
import shareIcon from '../images/shareIcon.svg';
import { ApiCocktailFirstItems } from '../services/theCockTailAPI';
import { ApiRecipeDetail } from '../services/theMealAPI';

export default function FoodDetails() {
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
  RecipeInit(currMeal);

  if (!currMeal.recipe) return;
  const { arrRecipeIngredients, arrRecipeMeasureUnit,
    recipe, recomends, doneRecipe, inProgress } = currMeal;

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
      <FavoriteButton recipe={ recipe } />
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
      {!doneRecipe ? (
        <Button
          variant="dark"
          className="fixed-bottom"
          data-testid="start-recipe-btn"
          onClick={ () => setCurrMeal({ ...currMeal, recipeInit: true }) }
        >
          {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
        </Button>) : null}
    </Card>
  );
}
