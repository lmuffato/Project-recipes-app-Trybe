import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actionDetails } from '../redux/actions';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';
import '../components/Footer.css';

function MealDetails() {
  const id = window.location.href.split('/')[4];
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [recomendations, setRecomendations] = useState();
  const history = useHistory();

  useEffect(() => {
    const mealDrinks = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { meals } = await fetch(url).then((r) => r.json());
      setData(meals);
      dispatch(actionDetails(meals));
    };
    const fetchRecomendations = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const { drinks } = await fetch(url).then((r) => r.json());
      setRecomendations(drinks);
    };
    mealDrinks();
    fetchRecomendations();
  }, [dispatch, id]);

  const renderRecomendations = (param) => {
    if (param) {
      return (
        param.map((recipe, index) => {
          const { strDrink, strAlcoholic, strDrinkThumb } = recipe;
          const limitNumber = 6;
          if (index <= limitNumber) {
            return (
              <div data-testid={ `${index}-recomendation-card` } key={ index }>
                <img alt={ strDrink } src={ strDrinkThumb } />
                <h3>{strAlcoholic}</h3>
                <h2>{strDrink}</h2>
              </div>
            );
          }
          return '';
        })
      );
    }
    return '';
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
          <img
            className="recipe-img"
            alt="recipe"
            data-testid="recipe-photo"
            src={ strMealThumb }
          />
          <div>
            <h2 data-testid="recipe-title">{strMeal}</h2>
            <img alt="share" data-testid="share-btn" src={ shareIcon } />
            <img alt="favorite" data-testid="favorite-btn" src={ favoriteIcon } />
          </div>
          <h3 data-testid="recipe-category">{strCategory}</h3>
          <h2>Ingredients</h2>
          <ul>
            { ingredients.map((item, index) => {
              if (item !== '') {
                if (measure[index].length > 1) {
                  return (
                    <li
                      key={ index }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {`${item} - ${measure[index]}`}
                    </li>
                  );
                }
                return (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`${item} - ${measure[index]} un`}
                  </li>
                );
              }
              return '';
            })}
          </ul>
          <h2>Instructions</h2>
          <p data-testid="instructions">{strInstructions}</p>
          <h2>Video</h2>
          <iframe
            type="text/html"
            title="recipe"
            width="420"
            height="315"
            src={ `https://www.youtube.com/embed/${youtubeEmbed}` }
            data-testid="video"
          />
          <h2>Recomendadas</h2>
          {renderRecomendations(recomendations)}
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
    <div>
      {renderMealRecipe()}
    </div>
  );
}

export default MealDetails;
