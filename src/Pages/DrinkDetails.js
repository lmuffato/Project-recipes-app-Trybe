import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actionDetails } from '../redux/actions';
import shareIcon from '../images/shareIcon.svg';
import blackFavoriteIcon from '../images/blackHeartIcon.svg';
import whiteFavoriteIcon from '../images/whiteHeartIcon.svg';
import '../components/Footer.css';
import RecomendationCard from '../util/renderRecomendationCard';

function DrinkDetails() {
  const id = window.location.href.split('/')[4];
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [copy, setCopy] = useState('');
  const [recomendations, setRecomendations] = useState();
  const history = useHistory();
  const [test, setTest] = useState('');

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

  useEffect(() => {
    const storage = localStorage.getItem('favoriteRecipes');
    if (storage) {
      setTest(JSON.stringify(storage));
    }
  }, []);

  const addFavorite = (recipe) => {
    const obj = {
      id: recipe.idDrink,
      type: 'bebida',
      area: recipe.strArea ? recipe.strArea : '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
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
    const newValue = previousValue.filter((obj) => obj.id !== recipe.idDrink);
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
      check = formatedStorage.filter((st) => st.id.includes(recipe.idDrink));
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
            {renderFavoriteHeart(data[0])}
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

export default DrinkDetails;
