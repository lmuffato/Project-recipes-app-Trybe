import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { getRecipeByID } from '../../services/fetchRecipes';
import Ingredient from '../../Components/Ingredients';
import Slide from '../../Components/Slide';
import './styles.css';

import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

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
    <div className="main-parent">
      {isLoading ? 'Carregando' : (
        <div>
          <div className="hero">
            <img
              alt="hero"
              data-testid="recipe-photo"
              src={ recipesDetails[`str${recipeType}Thumb`] }
            />
          </div>
          <div className="header">
            <div>
              <h1 data-testid="recipe-title">
                {recipesDetails[`str${recipeType}`]}
              </h1>
              <h3 data-testid="recipe-category">
                {recipesDetails[toggleCategory]}
              </h3>
            </div>
            <div>
              <button type="button" data-testid="share-btn">
                <img src={ shareIcon } alt="share" />
              </button>
              <button type="button" data-testid="favorite-btn">
                <img src={ whiteHeartIcon } alt="favorite" />
              </button>
            </div>
          </div>
          <Ingredient type="list" recipe={ recipesDetails } />
          <div className="instructions">
            <h2>Instructions</h2>
            <p data-testid="instructions">
              {recipesDetails.strInstructions}
            </p>
          </div>
          {(recipeType === 'Meal')
            ? (
              <div className="video">
                <h2>Video</h2>
                <iframe
                  data-testid="video"
                  src={ `http://www.youtube.com/embed/${recipesDetails.strYoutube.split('=')[1]}` }
                  title="How to do"
                  style={ { border: 'none' } }
                  allowFullScreen
                />
              </div>)
            : null}
          <Slide
            toggle={ recipeType }
            category={ toggleCategory }
            className="ingredients"
          />
          {recipeStatus
            ? (
              <div className="init-btn">
                <Link to={ `/${toggleURL}/${id}/in-progress` }>
                  <Button
                    data-testid="start-recipe-btn"
                    size="lg"
                  >
                    {recipeStatus}
                  </Button>
                </Link>
              </div>
            )
            : null}
        </div>
      )}
    </div>
  );
}

export default Details;
