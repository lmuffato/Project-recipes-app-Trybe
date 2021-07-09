import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actionDetails } from '../redux/actions';
import shareIcon from '../images/shareIcon.svg';
import RecomendationCard from '../util/renderRecomendationCard';
import '../components/Footer.css';
import RenderFavoriteHeart from '../util/addOrRemoveFavorite';
import RenderIngredients from '../util/mealDetailsComponents/renderIngredients';

export default function DrinkDetails() {
  const id = window.location.href.split('/')[4];
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.detailsReducer.favorites);
  const [data, setData] = useState();
  const [copy, setCopy] = useState('');
  const [recomendations, setRecomendations] = useState();
  const history = useHistory();
  const INICIAR_RECEITA = 'Iniciar Receita';
  // const [startButton, setStartButton] = useState(INICIAR_RECEITA);

  useEffect(() => {
    const fetchDrinks = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { drinks } = await fetch(url).then((r) => r.json());
      setData(drinks);
      dispatch(actionDetails(drinks));
    };
    const fetchRecomendations = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const { meals } = await fetch(url).then((r) => r.json());
      setRecomendations(meals);
    };
    fetchDrinks();
    fetchRecomendations();
  }, [dispatch, id]);

  const renderRecomendations = (param) => (
    param && (
      param.map((recipe, index) => {
        const limitNumber = 6;
        return index < limitNumber && (
          <div className="recipe-card" key={ index }>
            {RecomendationCard('bebidas', recipe, index)}
          </div>
        );
      })
    )
  );

  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopy('Link copiado!');
  };

  const testButton = () => {
    const lS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (lS) {
      const ids = Object.keys(lS);
      if (ids.length > 0) {
        const find = ids.filter((e) => e === id);
        return (
          find ? 'Continuar Receita' : INICIAR_RECEITA
        );
      }
    }
    return INICIAR_RECEITA;
  };

  const renderDrinkRecipe = () => {
    const ingredients = [];
    const measure = [];
    const result = testButton();

    if (data) {
      const array = Object.entries(data[0]);
      array.forEach((item) => {
        if (item[0].includes('strIngredient') && item[1] !== null && item[1] !== '') {
          ingredients.push(item[1]);
        }
        if (item[0].includes('strMeasure') && item[1] !== null) {
          measure.push(item[1]);
        }
      });

      const { idDrink, strDrink, strAlcoholic, strDrinkThumb, strInstructions } = data[0];
      return (
        <div>
          <img
            data-testid="recipe-photo"
            className="recipe-img"
            alt="recipe"
            src={ strDrinkThumb }
          />
          <div>
            <h2 data-testid="recipe-title">{strDrink}</h2>
            <button data-testid="share-btn" type="button" onClick={ () => copyLink() }>
              <img alt="share" src={ shareIcon } />
            </button>
            {RenderFavoriteHeart('bebida', data[0], dispatch, globalState)}
          </div>
          {copy}
          <h3 data-testid="recipe-category">{strAlcoholic}</h3>
          <h2>Ingredients</h2>
          <ul>
            {RenderIngredients(ingredients, measure)}
          </ul>
          <h2>Instructions</h2>
          <p data-testid="instructions">{strInstructions}</p>
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
            onClick={ () => history.push(`/bebidas/${idDrink}/in-progress`) }
          >
            { result }
          </button>
        </div>
      );
    }
  };

  return (
    <div>
      {renderDrinkRecipe()}
    </div>
  );
}
