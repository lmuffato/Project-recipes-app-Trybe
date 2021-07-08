import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actionDetails } from '../redux/actions';
import shareIcon from '../images/shareIcon.svg';
import RecomendationCard from '../util/renderRecomendationCard';
import '../components/Footer.css';
import RenderFavoriteHeart from '../util/addOrRemoveFavorite';

export default function DrinkDetails() {
  const id = window.location.href.split('/')[4];
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.detailsReducer.favorites);
  const [data, setData] = useState();
  const [copy, setCopy] = useState('');
  const [recomendations, setRecomendations] = useState();
  const history = useHistory();

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

  const renderDrinkRecipe = () => {
    const ingredients = [];
    const measure = [];
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
            { ingredients.map((item, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${item} ${(measure[index] ? `- ${measure[index]}` : '')}`}
              </li>
            ))}
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
            Iniciar Receita
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
