import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router';
import { getRecipeByID } from '../../services/fetchRecipes';
import Ingredient from '../../Components/Ingredients';
import Slide from '../../Components/Slide';

import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function Details() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const [recipesDetails, setRecipesDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recipeType, setRecipeType] = useState('Meal');

  const toggleApi = (pathname.includes('comidas')) ? 'meals' : 'drinks';
  const toggleCategory = recipeType === 'Meal' ? 'strCategory' : 'strAlcoholic';

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
            src={ recipesDetails[`str${recipeType}Thumb`] }
          />
          <h1 data-testid="recipe-title">
            {recipesDetails[`str${recipeType}`]}
          </h1>
          <h3 data-testid="recipe-category">
            {recipesDetails[toggleCategory]}
          </h3>
          <button type="button" data-testid="share-btn">
            <img src={ shareIcon } alt="share" />
          </button>
          <button type="button" data-testid="favorite-btn">
            <img src={ whiteHeartIcon } alt="favorite" />
          </button>

          <Ingredient type="list" recipe={ recipesDetails } />

          <p data-testid="instructions">
            {recipesDetails.strInstructions}
          </p>

          {(recipeType === 'Meal')
            ? (
              <div>
                <h2>Video</h2>
                <iframe
                  data-testid="video"
                  src={ `http://www.youtube.com/embed/${recipesDetails.strYoutube.split('=')[1]}` }
                  title="How to do"
                />
              </div>)
            : ''}
          <Slide toggle={ recipeType } category={ toggleCategory } />
          <Button data-testid="start-recipe-btn">Iniciar Receita</Button>
        </div>
      )}
    </div>
  );
}

export default Details;
