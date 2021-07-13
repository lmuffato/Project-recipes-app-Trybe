import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import FavoriteButton from '../../Components/FavoriteButton';
import Ingredient from '../../Components/Ingredients';
import Loading from '../../Components/Loading';
import ShareButton from '../../Components/ShareButton';
import { getRecipeByID } from '../../services/fetchRecipes';
import { createDoneRecipe } from '../../helpers';
import UserContext from '../../context/UserContext';
import './styles.css';

function InProcess() {
  const { id } = useParams();
  const { pathname } = useLocation();

  const [isLoading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState({});
  const [finished, setFinished] = useState(false);
  const { setDoneRecipes } = useContext(UserContext);

  const recipeType = (pathname.includes('comidas')) ? 'Meal' : 'Drink';
  const toggleApi = (pathname.includes('comidas')) ? 'meals' : 'drinks';
  const toggleCategory = recipeType === 'Meal' ? 'strCategory' : 'strAlcoholic';

  let localDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (!localDoneRecipes) {
    localDoneRecipes = [];
  }

  useEffect(() => {
    getRecipeByID(pathname, id).then((response) => {
      setRecipe(response[toggleApi][0]);
      setLoading(false);
    });
  }, [id, pathname, toggleApi]);

  return (
    <div className="main-parent">
      {isLoading ? <Loading /> : (
        <div>
          <img
            className="hero"
            data-testid="recipe-photo"
            src={ recipe[`str${recipeType}Thumb`] }
            alt="hero"
          />
          <div className="title-cntl">
            <div>
              <h1 data-testid="recipe-title">
                {recipe[`str${recipeType}`]}
              </h1>
              <h3 data-testid="recipe-category">
                {recipe[toggleCategory]}
              </h3>
            </div>
            <div className="btn-components">
              <ShareButton dataTest="share-btn" />
              <FavoriteButton
                recipe={ recipe }
                recipeType={ recipeType }
              />
            </div>
          </div>
          <Ingredient
            type="checkbox"
            recipe={ recipe }
            validate={ setFinished }
            id={ id }
          />
          <div className="instructions">
            <h2>Instructions</h2>
            <p data-testid="instructions">
              {recipe.strInstructions}
            </p>
          </div>
          <div className="end-btn-cntl">
            <Link to="/receitas-feitas">
              <Button
                data-testid="finish-recipe-btn"
                disabled={ !finished }
                onClick={ () => {
                  setDoneRecipes(
                    [...localDoneRecipes, createDoneRecipe(id, recipeType, recipe)],
                  );
                  localStorage.setItem(
                    'doneRecipes', JSON.stringify(
                      [...localDoneRecipes, createDoneRecipe(id, recipeType, recipe)],
                    ),
                  );
                } }
              >
                Finalizar Receita
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default InProcess;
