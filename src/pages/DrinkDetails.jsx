import React, { useState } from 'react';
import { Button, Card, Carousel } from 'react-bootstrap';
import RecipeDetail from '../effects/RecipeDetails';
import RecipeInit from '../effects/RecipeInit';
import { ApiDetailsById } from '../services/theCockTailAPI';
import { ApiFirstsResults } from '../services/theMealAPI';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';

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
    <Card className="recipeDetailsCard">
      <img
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
        data-testid="recipe-photo"
      />
      <div className="detailsHeader">
        <div className="titleDiv">
          <h2 data-testid="recipe-title">{recipe.strDrink}</h2>
          <p data-testid="recipe-category">{recipe.strAlcoholic}</p>
        </div>
        <div className="buttonsRecipeDetails">
          <ShareButton />
          <FavoriteButton recipe={ recipe } />
        </div>
      </div>
      <div className="detailsIngredients">
        <h3>Ingredientes:</h3>
        <div>
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
        </div>
      </div>
      <div className="detailsIngredients">
        <h3>Instruções:</h3>
        <div>
          <p data-testid="instructions">{ recipe.strInstructions }</p>
        </div>
      </div>
      {recipe.strYoutube ? <iframe
        title={ recipe.strMeal }
        width="240"
        height="120"
        data-testid="video"
        src={ recipe.strYoutube }
      /> : null}
      <div className="carousel">
        <h3 className="carouselTitle">Pratos Recomendados:</h3>
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
                <h3
                  className="imgText"
                  data-testid={ `${index}-recomendation-title` }
                >
                  {item.strMeal}
                </h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
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
