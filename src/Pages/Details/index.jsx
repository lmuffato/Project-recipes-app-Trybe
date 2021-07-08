import React, { useEffect, useState, useContext } from 'react';
import { Image } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router';
import UserContext from '../../context/UserContext';
import { getRecipeByID } from '../../services/fetchRecipes';
import Ingredient from '../../Components/Ingredients';
import Slide from '../../Components/Slide';
import ShareButton from '../../Components/ShareButton';
import FavoriteButton from '../../Components/FavoriteButton';
import EndButton from '../../Components/EndButton';
import Video from '../../Components/Video';
import Loading from '../../Components/Loading';
import './styles.css';

function Details() {
  const { pathname } = useLocation();
  const { id } = useParams();

  const [recipesDetails, setRecipesDetails] = useState({});
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
    <div className="main-parent">
      {isLoading ? <Loading /> : (
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
          <FavoriteButton recipe={ recipesDetails } recipeType={ recipeType } />

          <Ingredient type="list" recipe={ recipesDetails } />
          <div className="instructions">
            <h2>Instructions</h2>
            <p data-testid="instructions">
              {recipesDetails.strInstructions}
            </p>
          </div>
          { isLoading ? '' : (
            <Video recipeType={ recipeType } recipesDetails={ recipesDetails } />
          )}
          <Slide
            toggle={ recipeType }
            category={ toggleCategory }
            className="ingredients"
          />
          {recipeStatus
            ? (
              <EndButton
                id={ id }
                toggleURL={ toggleURL }
                recipeStatus={ recipeStatus }
              />)
            : null}
        </div>
      )}
    </div>
  );
}

export default Details;
