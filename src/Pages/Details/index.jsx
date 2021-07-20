import React, { useEffect, useState, useContext } from 'react';
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
import { createToggles } from '../../helpers';
import './styles.css';

function Details() {
  const { pathname } = useLocation();
  const { id } = useParams();

  const [recipesDetails, setRecipesDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [recipeStatus, setRecipeStatus] = useState('Iniciar Receita');
  const { doneRecipes, doingRecipes } = useContext(UserContext);

  const {
    recipeType, toggleApi, toggleCategory, toggleURL, toggleLocalDoing,
  } = createToggles(pathname);

  useEffect(() => {
    getRecipeByID(pathname, id).then((response) => {
      setRecipesDetails(response[toggleApi][0]);
      setIsLoading(false);
    });
    const checkRecipe = () => {
      const done = doneRecipes.find((recipe) => recipe.id === id);
      const doing = doingRecipes[toggleLocalDoing];
      if (done) return setRecipeStatus('');
      if (doing && doing[id]) return setRecipeStatus('Continuar Receita');
    };
    checkRecipe();
  }, [doingRecipes, doneRecipes, id, pathname, toggleApi, toggleLocalDoing]);

  return (
    <div className="main-parent">
      {isLoading ? <Loading /> : (
        <div>
          <img
            className="hero"
            data-testid="recipe-photo"
            src={ recipesDetails[`str${recipeType}Thumb`] }
            alt="hero"
          />
          <div className="title-cntl">
            <div>
              <h1 data-testid="recipe-title">
                {recipesDetails[`str${recipeType}`]}
              </h1>
              <h3 data-testid="recipe-category">
                {recipesDetails[toggleCategory]}
              </h3>
            </div>
            <div className="share-btn">
              <ShareButton dataTest="share-btn" />
              <FavoriteButton
                recipe={ recipesDetails }
                recipeType={ recipeType }
                isLoading={ isLoading }
              />
            </div>
          </div>
          <span />
          <Ingredient
            type="list"
            recipe={ recipesDetails }
            id={ id }
          />
          <span />
          <div className="instructions">
            <h2>Instructions</h2>
            <p data-testid="instructions">
              {recipesDetails.strInstructions}
            </p>
          </div>
          <span />
          { isLoading ? '' : (
            <Video recipeType={ recipeType } recipesDetails={ recipesDetails } />
          )}
          <Slide
            toggle={ recipeType }
            category={ toggleCategory }
            cleanState={ setRecipesDetails }
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
