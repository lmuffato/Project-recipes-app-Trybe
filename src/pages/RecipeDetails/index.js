import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import ShareIcon from '../../images/shareIcon.svg';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';
import fetchByIdApi from '../../services/fetchApiDetails';
import RecomCard from './RecomCard';

export default function RecipeDetails(props) {
  const { context } = useContext(AppContext);
  const { pageOrigin } = context;
  const [recipe, setRecipe] = useState({});
  const { match: { params: { id } } } = props;

  useEffect(() => {
    fetchByIdApi(pageOrigin, id)
      .then((recipeCrr) => {
        console.log(recipeCrr);
        setRecipe(recipeCrr);
      });
  }, []);

  function getYouTubeURL() {
    const recipeURL = recipe.strYoutube.split('=');
    const VIDEO_ID = recipeURL[recipeURL.length - 1];
    console.log(VIDEO_ID);
    return `http://www.youtube.com/embed/${VIDEO_ID}`;
  }

  function getIngredients() {
    const ingredients = Object.entries(recipe)
      .filter((property) => property[0].includes('strIngredient') && property[1]);
    return ingredients;
  }

  function getMeasures() {
    const measures = Object.entries(recipe)
      .filter((property) => {
        const checkKey = property[0].includes('strMeasure');
        const checkValue = property[1];
        return checkKey && checkValue;
      });
    return measures;
  }

  return (
    <div>
      {recipe ? (
        <div>
          <img
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            data-testid="recipe-photo"
            width="200px"
            alt="recipe details"
          />
          <h2 data-testid="recipe-title">
            { recipe.strMeal || recipe.strDrink }
          </h2>
          <button type="button" onClick="">
            <img src={ ShareIcon } alt="share button" data-testid="share-btn" />
          </button>
          <button type="button" onClick="">
            <img
              src={ WhiteHeartIcon }
              alt="favorite button"
              data-testid="favorite-btn"
            />
          </button>
          <p data-testid="recipe-category">
            { recipe.strCategory }
          </p>
          <h3>Ingredients</h3>
          <ul data-testid="0-ingredient-name-and-measure">
            {getIngredients().map(
              (ingredient, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${ingredient[1]} - ${getMeasures()[index][1]}`}
                </li>),
            )}
          </ul>
          <h3>Instructions</h3>
          <p data-testid="instructions">{ recipe.strInstructions }</p>
          <h3>Vídeo</h3>
          { pageOrigin === 'themealdb' && recipe.strYoutube ? (
            <iframe
              src={ getYouTubeURL() }
              title="recipe video"
              data-testid="video"
            />
          ) : ''}
          <RecomCard data-testid="${index}-recomendation-card" />
          <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
        </div>)
        : ''}
    </div>
  );
}
