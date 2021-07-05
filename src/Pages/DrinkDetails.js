import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionDetails } from '../redux/actions';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';

function DrinkDetails() {
  const id = window.location.href.split('/')[4];
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [recomendations, setRecomendations] = useState();

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

  const renderRecomendations = (param) => {
    if (param) {
      return (
        param.map((recipe, index) => {
          const { strMeal, strCategory, strMealThumb } = recipe;
          const limitNumber = 6;
          if (index <= limitNumber) {
            return (
              <div data-testid={ `${index}-recomendation-card` } key={ index }>
                <img alt={ strMeal } src={ strMealThumb } />
                <h3>{strCategory}</h3>
                <h2>{strMeal}</h2>
              </div>
            );
          }
          return '';
        })
      );
    }
    return '';
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

      const { strDrink, strAlcoholic, strDrinkThumb, strInstructions } = data[0];
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
            <img alt="share" data-testid="share-btn" src={ shareIcon } />
            <img alt="favorite" data-testid="favorite-btn" src={ favoriteIcon } />
          </div>
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
          {renderRecomendations(recomendations)}
          <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
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

export default DrinkDetails;
