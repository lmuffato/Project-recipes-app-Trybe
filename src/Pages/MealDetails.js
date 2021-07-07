import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actionDetails } from '../redux/actions';
import RecomendationCard from '../util/renderRecomendationCard';
import shareIcon from '../images/shareIcon.svg';
import blackFavoriteIcon from '../images/blackHeartIcon.svg';
import whiteFavoriteIcon from '../images/whiteHeartIcon.svg';
import '../components/Footer.css';
import './PagesCss/Details.css';

function MealDetails() {
  const id = window.location.href.split('/')[4];
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [copy, setCopy] = useState('');
  const [recomendations, setRecomendations] = useState();
  const history = useHistory();
  const [test, setTest] = useState('');

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

  useEffect(() => {
    const storage = localStorage.getItem('favoriteRecipes');
    if (storage) {
      setTest(JSON.stringify(storage));
    }
  }, []);

  const addFavorite = (recipe) => {
    const obj = {
      id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea ? recipe.strArea : '',
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      // doneDate,
      // tags,
    };
    const previousValue = localStorage.getItem('favoriteRecipes');
    if (previousValue) {
      const formatedPreviousValue = JSON.parse(previousValue);
      const newObj = [...formatedPreviousValue, obj];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newObj));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
    }
    setTest(JSON.stringify(localStorage.getItem('favoriteRecipes')));
  };

  const removeFavorite = (recipe) => {
    const previousValue = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newValue = previousValue.filter((obj) => obj.id !== recipe.idMeal);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newValue));
    if ((localStorage.getItem('favoriteRecipes')).length > 0) {
      setTest([JSON.stringify(localStorage.getItem('favoriteRecipes'))]);
    } else {
      setTest('');
    }
  };

  const renderFavoriteHeart = (recipe) => {
    const storage = test;
    let check = '';
    if (storage) {
      const formatedStorage = JSON.parse(JSON.parse(storage));
      check = formatedStorage.filter((st) => st.id.includes(recipe.idMeal));
    }
    if (check !== '' && check.length > 0) {
      return (
        <button type="button" onClick={ () => removeFavorite(recipe) }>
          <img alt="favorite" data-testid="favorite-btn" src={ blackFavoriteIcon } />
        </button>
      );
    }
    return (
      <button type="button" onClick={ () => addFavorite(recipe) }>
        <img alt="favorite" data-testid="favorite-btn" src={ whiteFavoriteIcon } />
      </button>
    );
  };

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

  const renderInstructions = (strInst, ytEmb) => (
    <>
      <p data-testid="instructions">{strInst}</p>
      <h2>Video</h2>
      <iframe
        type="text/html"
        title="recipe"
        width="330"
        height="315"
        src={ `https://www.youtube.com/embed/${ytEmb}` }
        data-testid="video"
      />
    </>
  );

  const renderIngredients = (ingredients, measure) => (
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
  );

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
            <button data-testid="share-btn" type="button" onClick={ () => copyLink() }>
              <img alt="share" src={ shareIcon } />
            </button>
            {renderFavoriteHeart(data[0])}
          </div>
          {copy}
          <h3 data-testid="recipe-category">{strCategory}</h3>
          <h2>Ingredients</h2>
          {renderIngredients(ingredients, measure)}

          <h2>Instructions</h2>
          {renderInstructions(strInstructions, youtubeEmbed)}

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

export default MealDetails;
