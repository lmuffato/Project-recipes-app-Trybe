import React, { useEffect, useState, useContext } from 'react';
import copy from 'clipboard-copy';
import { BiHeart, BiShareAlt } from 'react-icons/bi';
import { useHistory, useParams } from 'react-router-dom';
import { RecipesContext } from '../../context/Recipes';

import HeaderBack from '../../components/HeaderBack';
import Ingredient from './components/Ingredient';
import Video from './components/Video';
import Recommendations from './components/Recommendations';
import StartOrFinishRecipeBtn from './components/StartOrFinishRecipeBtn';

import { getRecipe, getRecommendations } from '../../services/recipesData';

import styles from './styles.module.scss';

function Recipe() {
  const { location: { pathname } } = useHistory();
  const { addDoneRecipe } = useContext(RecipesContext);
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [videoId, setVideoId] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [finishedSteps, setFinishedSteps] = useState({});
  const [copiedLink, setCopiedLink] = useState(false);
  const alcoholicRecipe = recipe.strAlcoholic && recipe.strAlcoholic === 'Alcoholic';

  useEffect(() => {
    async function loadRecipe() {
      const path = `/${pathname.split('/')[1]}`;
      const result = await getRecipe(path, id);
      setVideoId(result.strYoutube && result.strYoutube.split('=')[1]);

      const stepsToFinish = {};

      result.ingredients.forEach((ingredient) => {
        stepsToFinish[ingredient] = false;
      });

      setRecipe(result);
      setFinishedSteps(stepsToFinish);
    }

    loadRecipe();
  }, [pathname, id]);

  useEffect(() => {
    async function loadRecommendations() {
      const recipes = await getRecommendations(`/${pathname.split('/')[1]}`);
      const numberOfRecommendations = 6;
      setRecommendations(
        { path: recipes.path, list: recipes.list.slice(0, numberOfRecommendations) },
      );
    }

    loadRecommendations();
  }, [pathname]);

  function validateRecipeProgress({ target: { id: ingredientName, checked } }) {
    const temporaryObject = {
      ...finishedSteps,
      [ingredientName]: checked,
    };
    const notFinished = Object.values(temporaryObject).filter((finished) => !finished);
    if (notFinished.length === 0) addDoneRecipe(id, recipe, pathname);
    setFinishedSteps({ ...finishedSteps, [ingredientName]: checked });
  }

  function copyLink() {
    copy(window.location.href);
    setCopiedLink(true);
  }

  return (
    <div className={ styles.recipe }>
      <HeaderBack title={ recipe.name || 'Recipe' } />
      <div className={ styles.header }>
        <img src={ recipe.imagePath } alt={ recipe.name } data-testid="recipe-photo" />
        <div className={ styles.options }>
          <button type="button" data-testid="favorite-btn">
            <BiHeart />
          </button>
          <button type="button" data-testid="share-btn" onClick={ copyLink }>
            <BiShareAlt />
            { copiedLink && (
              <span>
                Link copiado!
              </span>
            ) }
          </button>
        </div>
      </div>
      <main>
        <StartOrFinishRecipeBtn recipe={ recipe } />
        <h1 data-testid="recipe-title">{ recipe.name }</h1>
        <h3 data-testid="recipe-category">
          { alcoholicRecipe ? 'Alcoholic' : recipe.strCategory }
        </h3>
        <section>
          <h2>Ingredients</h2>
          <ul className={ styles.listOfIngredients }>
            { recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
              <Ingredient
                key={ ingredient }
                data={ ingredient }
                index={ index }
                finishStep={ validateRecipeProgress }
              />
            ))}
          </ul>
        </section>
        <section>
          <h2>Intructions</h2>
          <p data-testid="instructions">{ recipe.strInstructions }</p>
        </section>
        <section>
          { videoId && (
            <>
              <h2>Video</h2>
              <Video videoId={ videoId } recipeTitle={ recipe.name } />
            </>
          ) }
        </section>
        { recommendations.list && (
          <section>
            <h2>Recomendadas</h2>
            <div className={ styles.recommendationsCarousel }>
              <Recommendations data={ recommendations } />
            </div>
          </section>
        ) }
      </main>
    </div>
  );
}

export default Recipe;
