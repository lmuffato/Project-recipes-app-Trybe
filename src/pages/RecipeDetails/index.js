import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import ShareIcon from '../../images/shareIcon.svg';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';
import fetchByIdApi from '../../services/fetchApiDetails';
import Ingredients from './Ingredients';
import Recommendations from './Recommendations';
import Video from './Video';

export default function RecipeDetails(props) {
  const { context } = useContext(AppContext);
  const { pageOrigin } = context;
  const [recipe, setRecipe] = useState({});
  const { match: { params: { id } } } = props;

  useEffect(() => {
    fetchByIdApi(pageOrigin, id)
      .then((recipeCrr) => {
        setRecipe(recipeCrr);
      });
  }, []);

  return (
    <div>
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
        <Video recipe={ recipe } />
        <Ingredients recipe={ recipe } />
        <h3>Instructions</h3>
        <p data-testid="instructions">{ recipe.strInstructions }</p>
        <Recommendations />
        <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
      </div>
    </div>
  );
}
