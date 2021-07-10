import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import FavoriteButton from '../../Components/FavoriteButton';
import Ingredient from '../../Components/Ingredients';
import Loading from '../../Components/Loading';
import ShareButton from '../../Components/ShareButton';
import { getRecipeByID } from '../../services/fetchRecipes';

function InProcess() {
  const { id } = useParams();
  const { pathname } = useLocation();

  const [isLoading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState({});

  const recipeType = (pathname.includes('comidas')) ? 'Meal' : 'Drink';
  const toggleApi = (pathname.includes('comidas')) ? 'meals' : 'drinks';
  const toggleCategory = recipeType === 'Meal' ? 'strCategory' : 'strAlcoholic';

  useEffect(() => {
    getRecipeByID(pathname, id).then((response) => {
      setRecipe(response[toggleApi][0]);
      setLoading(false);
    });
  }, []);

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
          <div>
            <h1 data-testid="recipe-title">
              {recipe[`str${recipeType}`]}
            </h1>
            <h3 data-testid="recipe-category">
              {recipe[toggleCategory]}
            </h3>
            <div className="btn-components">
              <ShareButton />
              <FavoriteButton
                recipe={ recipe }
                recipeType={ recipeType }
              />
            </div>
          </div>
          <Ingredient type="checkbox" recipe={ recipe } />
          <div className="instructions">
            <h2>Instructions</h2>
            <p data-testid="instructions">
              {recipe.strInstructions}
            </p>
          </div>
          <Button
            data-testid="finish-recipe-btn"
          >
            Finalizar Receita
          </Button>
        </div>
      )}
    </div>
  );
}

export default InProcess;
