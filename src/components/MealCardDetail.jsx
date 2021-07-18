import React, { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useHistory } from 'react-router-dom';
import ButtonStartRecipe from './ButtonStartRecipe';
import UserContext from '../context/UserContext';
import shareIcon from '../images/shareIcon.svg';
import IngredientsList from './IngredientsList';
import RecomendedDrinks from './RecomendedDrinks';
import SearchContext from '../context/SearchContext';
import { getItemFromLocalStorage } from '../services/localStorage';
import { recipeRow } from '../services/recipeRow';
import FavoriteButton from './FavoriteButton';

const copy = require('clipboard-copy');

function MealCardDetail() {
  const { fullDrinks } = useContext(SearchContext);
  const { currentMeal } = useContext(UserContext);
  const [youtubeId, setYoutubeId] = useState('');
  const [textButton, setTextButton] = useState('Iniciar Receita');
  const [copyLink, setCopyLink] = useState(false);
  const donedRecipes = getItemFromLocalStorage('doneRecipes');
  const history = useHistory();

  let inProgressRecipes;
  if (getItemFromLocalStorage('inProgressRecipes')) {
    inProgressRecipes = Object.keys(getItemFromLocalStorage('inProgressRecipes').meals);
  }

  const RECOMMENDED_NUMBER = 6;
  useEffect(() => {
    setYoutubeId(currentMeal.strYoutube);
  }, [currentMeal]);

  useEffect(() => {
    const obj = {
      donedRecipes,
      textButton,
      inProgressRecipes,
      setTextButton,
      currentMeal,
    };
    recipeRow(obj);
  });

  const shareClick = () => {
    const URL = history.location.pathname.replace('in-progress', '');
    copy(`http://localhost:3000${URL}`);
    setCopyLink(true);
  };

  return (
    <div className="detailMeal">
      <img
        src={ currentMeal.strMealThumb }
        alt="imagem da receita"
        data-testid="recipe-photo"
        className="detailImage"
      />
      <div className="detailsTitle bodyPadding">
        <h3 data-testid="recipe-title">{ currentMeal.strMeal }</h3>
        <div>
          <button
            data-testid="share-btn"
            type="button"
            onClick={ shareClick }
            className="shareButton"
          >
            <img src={ shareIcon } alt="compartilhar" />
          </button>
          {copyLink ? <span>Link copiado!</span> : null}
          <FavoriteButton type="comida" />
        </div>
      </div>
      <span
        data-testid="recipe-category"
        className="recipe-category bodyPadding"
      >
        { currentMeal.strCategory }
      </span>
      <div className="bodyPadding">
        <h4>Ingredients</h4>
        <IngredientsList currentMeal={ currentMeal } />
        <h4>Instructions</h4>
        <p data-testid="instructions">{ currentMeal.strInstructions }</p>
      </div>
      <ReactPlayer
        data-testid="video"
        width="320"
        height="160"
        url={ youtubeId }
      />
      <h4 className="bodyPadding">Recommended Drinks</h4>
      <div className="carousel-list">
        {fullDrinks.map((drink, index) => (
          index < RECOMMENDED_NUMBER ? (
            <RecomendedDrinks
              key={ index }
              recommendationId={ `${index}-recomendation-card` }
              drinkImg={ drink.strDrinkThumb }
              drinkName={ drink.strDrink }
              drinkTitleId={ `${index}-recomendation-title` }
            />
          ) : (null)
        ))}
      </div>
      {textButton !== '' ? (
        <ButtonStartRecipe
          buttonText={ textButton }
          type="comidas"
          id={ currentMeal.idMeal }
        />
      ) : (null)}
    </div>
  );
}

export default MealCardDetail;
