import React, { useState } from 'react';
import { Button, Card, Carousel } from 'react-bootstrap';
import FavoriteButton from '../components/FavoriteButton';
import RecipeDetail from '../effects/RecipeDetails';
import RecipeInit from '../effects/RecipeInit';
import shareIcon from '../images/shareIcon.svg';
import { ApiDetailsById } from '../services/theCockTailAPI';
import { ApiFirstsResults } from '../services/theMealAPI';

export default function DrinkDetails() {
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
  RecipeInit(currDrink);

  if (!currDrink.recipe) return;
  const { arrRecipeIngredients, arrRecipeMeasureUnit,
    recipe, recomends, doneRecipe, inProgress } = currDrink;

  return (
    <Card style={ { width: '18rem' } }>
      <h2 data-testid="recipe-title">{recipe.strDrink}</h2>
      <img
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
        data-testid="recipe-photo"
      />
      <img
        style={ { width: '2rem' } }
        data-testid="share-btn"
        src={ shareIcon }
        alt="compartilhar"
      />
      <FavoriteButton recipe={ recipe } />
      <h3 data-testid="recipe-category">{recipe.strAlcoholic}</h3>
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
      <Carousel>
        {recomends.map((item, index) => (
          <Carousel.Item key={ `${index}-${item.strMeal}` }>
            <img
              className="d-block w-100"
              src={ item.strMealThumb }
              alt={ item.strMeal }
              data-testid={ `${index}-recomendation-card` }
            />
            <Carousel.Caption>
              <h3 data-testid={ `${index}-recomendation-title` }>{item.strMeal}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      {!doneRecipe ? (
        <Button
          className="fixed-bottom"
          variant="dark"
          data-testid="start-recipe-btn"
          onClick={ () => setCurrDrink({ ...currDrink, recipeInit: true }) }
        >
          {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
        </Button>) : null}
    </Card>
  );
}
