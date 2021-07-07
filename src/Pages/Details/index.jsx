import React, { useEffect, useState, useContext } from 'react';
import { Button, Image } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { getRecipeByID } from '../../services/fetchRecipes';
import Ingredient from '../../Components/Ingredients';
import Slide from '../../Components/Slide';
import ShareButton from '../../Components/ShareButton';
import FavoriteButton from '../../Components/FavoriteButton';

function Details() {
  const { pathname } = useLocation();
  const { id } = useParams();

  const [recipesDetails, setRecipesDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recipeStatus, setRecipeStatus] = useState('Iniciar Receita');
  const { doneRecipes, doingRecipes } = useContext(UserContext);

  const recipeType = (pathname.includes('comidas')) ? 'Meal' : 'Drink';
  const toggleApi = (pathname.includes('comidas')) ? 'meals' : 'drinks';
  const toggleCategory = recipeType === 'Meal' ? 'strCategory' : 'strAlcoholic';
  const toggleURL = (pathname.includes('comidas')) ? 'comidas' : 'bebidas';

  useEffect(() => {
    getRecipeByID(pathname, id).then((response) => {
      setRecipesDetails(response[toggleApi][0]);
      setIsLoading(false);
    });
    const checkRecipe = () => {
      const done = doneRecipes.find((recipe) => recipe.id === id);
      const doing = doingRecipes.find((recipe) => recipe.id === id);
      if (done) return setRecipeStatus('');
      if (doing) return setRecipeStatus('Continuar Receita');
    };
    checkRecipe();
  }, [doingRecipes, doneRecipes, id, pathname, toggleApi]);

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

          <ShareButton />
          <FavoriteButton />

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
            : null}
          <Slide toggle={ recipeType } category={ toggleCategory } />
          { recipeStatus
            ? (
              <Link to={ `/${toggleURL}/${id}/in-progress` }>
                <Button data-testid="start-recipe-btn">{ recipeStatus }</Button>
              </Link>
            )
            : null}
        </div>
      )}
    </div>
  );
}

export default Details;
