import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actionDetails } from '../redux/actions';
import RecomendationCard from '../util/renderRecomendationCard';
import RenderRecipeImg from '../util/mealDetailsComponents/renderRecipeImg';
import RenderIngredients from '../util/mealDetailsComponents/renderIngredients';
import RenderInstructions from '../util/mealDetailsComponents/renderInstructions';
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

  const renderMealRecipe = () => {
    const ingredients = [];
    const measure = [];
    if (data) {
      const array = Object.entries(data[0]);
      array.forEach((item) => {
        if (item[0].includes('strIngredient') && item[1] !== null) {
          ingredients.push(item[1]);
        }
        if (item[0].includes('strMeasure')) {
          measure.push(item[1]);
        }
      });

      const {
        idMeal, strMeal, strCategory, strMealThumb, strInstructions, strYoutube,
      } = data[0];
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
          {RenderIngredients(ingredients, measure)}
          <h2>Instructions</h2>
          {RenderInstructions(strInstructions, youtubeEmbed)}
          <h2>Recomendadas</h2>
          <div className="carousel-container">
            <div className="recipies-list">
              {renderRecomendations(recomendations)}
            </div>
          </div>
          <button
            className="footer"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => history.push(`/comidas/${idMeal}/in-progress`) }
          >
            Iniciar Receita
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
