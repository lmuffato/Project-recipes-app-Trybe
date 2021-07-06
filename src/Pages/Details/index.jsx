import React, { useEffect, useState } from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router';
import { getRecipeByID } from '../../services/fetchRecipes';
import Ingredient from '../../Components/Ingredients';

function Details() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const [recipesDetails, setRecipesDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recipeType, setRecipeType] = useState('Meal');
  const toggleApi = (pathname.includes('comidas')) ? 'meals' : 'drinks';

  useEffect(() => {
    getRecipeByID(pathname, id).then((response) => {
      setRecipesDetails(response[toggleApi][0]);
      setIsLoading(false);
      if (toggleApi === 'drinks') { setRecipeType('Drink'); }
    });
  }, [id, pathname, toggleApi]);

  return (
    <div>
      {isLoading ? 'Carregando' : (
        <div>
          <Image
            thumbnail
            data-testid="recipe-photo"
            src={ recipesDetails.strMealThumb }
          />
          <h1 data-testid="recipe-title">
            {recipesDetails.strMeal}
          </h1>
          <h3 data-testid="recipe-category">
            {recipeType === 'Meal' ? recipesDetails.strCategory : ''}
          </h3>
          <button type="button" data-testid="share-btn">Share</button>
          <button type="button" data-testid="favorite-btn">Favorite</button>
          <Ingredient type="list" recipe={ recipesDetails } />
          <p data-testid="instructions">
            {recipesDetails.strInstructions}
          </p>
          {(recipeType === 'Meal')
            ? <video data-testid="video"><track kind="captions" /></video>
            : ''}
          <Card data-testid={ `${0}-recomendation-card` }>Card</Card>
          <Button data-testid="start-recipe-btn">Iniciar Receita</Button>
        </div>
      )}
    </div>
  );
}

export default Details;
