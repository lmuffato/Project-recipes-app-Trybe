import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actionDetails, actionIdRecipeInProgress } from '../redux/actions';
import RecomendationCard from '../util/renderRecomendationCard';
import RenderRecipeImg from '../util/mealDetailsComponents/renderRecipeImg';
import RenderIngredients from '../util/mealDetailsComponents/renderIngredients';
import RenderInstructions from '../components/renderInstructions';
import shareIcon from '../images/shareIcon.svg';
import '../components/Footer.css';
import '../PagesCss/Details.css';
import RenderFavoriteHeart from '../util/addOrRemoveFavorite';

export default function MealDetails() {
  const id = window.location.href.split('/')[4];
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [copy, setCopy] = useState('');
  const [recomendations, setRecomendations] = useState();
  const globalState = useSelector((state) => state.detailsReducer.favorites);
  const history = useHistory();
  const INICIAR_RECEITA = 'Iniciar Receita';

  useEffect(() => {
    const mealDrinks = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { meals } = await fetch(url).then((r) => r.json());
      dispatch(actionDetails(meals));
      setData(meals);
    };
    const fetchRecomendations = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const { drinks } = await fetch(url).then((r) => r.json());
      setRecomendations(drinks);
    };
    mealDrinks();
    fetchRecomendations();
  }, [dispatch, id]);

  const renderRecomendations = (param) => (
    param && (
      param.map((recipe, index) => {
        const limitNumber = 6;
        return index < limitNumber && (
          <div className="recipe-card" key={ index }>
            {RecomendationCard('comidas', recipe, index)}
          </div>
        );
      }))
  );

  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopy('Link copiado!');
  };

  const enableDisableButton = (recId) => {
    const doneRec = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRec) {
      const doneMeals = doneRec.filter((e) => e.id === recId);
      if (doneMeals.length > 0) return false;
    }
    return true;
  };

  const textForButton = (recId) => {
    const lS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (lS) {
      const ids = Object.keys(lS.meals);
      if (ids.length > 0) {
        const find = ids.includes(recId);
        return (
          find ? 'Continuar Receita' : INICIAR_RECEITA
        );
      }
    }
    return INICIAR_RECEITA;
  };

  const goToRecipeInProgress = (idMeal, aux) => {
    dispatch(actionIdRecipeInProgress(idMeal, aux));
    history.push(`/comidas/${idMeal}/in-progress`);
  };

  const renderMealRecipe = () => {
    const ingredients = [];
    const measure = [];
    const aux = [];

    if (data && data.length > 0) {
      const array = Object.entries(data[0]);

      array.forEach((item) => {
        if (item[0].includes('strIngredient') && item[1] !== null && item[1] !== '') {
          ingredients.push(item[1]);
        }
        if (item[0].includes('strMeasure')) {
          measure.push(item[1]);
        }
      });
      ingredients.forEach((item, index) => {
        if (measure[index]) {
          aux.push(`${item} - ${measure[index]}`);
        } else {
          aux.push(item);
        }
      });

      const {
        idMeal, strMeal, strCategory, strMealThumb, strInstructions, strYoutube,
      } = data[0];
      const showButton = enableDisableButton(idMeal);
      const result = textForButton(idMeal);
      const youtubeEmbed = strYoutube.split('=')[1];
      return (
        <div>
          {RenderRecipeImg(strMealThumb)}
          <div>
            <h2 data-testid="recipe-title">{strMeal}</h2>
            <button data-testid="share-btn" type="button" onClick={ () => copyLink() }>
              <img alt="share" src={ shareIcon } />
            </button>
            {RenderFavoriteHeart('comida', data[0], dispatch, globalState)}
          </div>
          {copy}
          <h3 data-testid="recipe-category">{strCategory}</h3>
          <h2>Ingredients</h2>
          {RenderIngredients(aux)}
          <h2>Instructions</h2>
          <RenderInstructions strInst={ strInstructions } ytEmb={ youtubeEmbed } />
          <h2>Recomendadas</h2>
          <div className="carousel-container">
            <div className="recipies-list">
              {renderRecomendations(recomendations)}
            </div>
          </div>
          <button
            className={ showButton ? 'footer' : 'hide-button' }
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => goToRecipeInProgress(idMeal, aux) }
          >
            { result }
          </button>
        </div>
      );
    }
  };

  return (
    <div className="meal-detail-container">
      {renderMealRecipe()}
    </div>
  );
}
