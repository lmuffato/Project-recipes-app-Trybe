import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import shareIcon from '../images/shareIcon.svg';
import FavoriteButton from './FavoriteButton';
import IngredientsList from './IngredientsList';
import RecomendedMeals from './RecomendedMeals';
import SearchContext from '../context/SearchContext';
import { getItemFromLocalStorage } from '../services/localStorage';
import ButtonStartRecipe from './ButtonStartRecipe';
import { recipeDrinkRow } from '../services/recipeRow';

const copy = require('clipboard-copy');

function DrinkCardDetail() {
  const { currentDrink } = useContext(UserContext);
  const { fullRecipes } = useContext(SearchContext);
  const [copyLink, setCopyLink] = useState(false);
  const [textButton, setTextButton] = useState('Iniciar Receita');
  const donedRecipes = getItemFromLocalStorage('doneRecipes');
  const history = useHistory();
  let inProgressRecipes;
  if (getItemFromLocalStorage('inProgressRecipes')) {
    inProgressRecipes = Object.keys(getItemFromLocalStorage('inProgressRecipes')
      .cocktails);
  }

  const RECOMMENDED_LENGHT = 6;

  useEffect(() => {
    const obj = {
      donedRecipes,
      textButton,
      inProgressRecipes,
      setTextButton,
      currentDrink,
    };
    recipeDrinkRow(obj);
  });

  const shareClick = () => {
    const URL = history.location.pathname.replace('in-progress', '');
    copy(`http://localhost:3000${URL}`);
    setCopyLink(true);
  };

  return (
    <div className="detailMeal">
      <img
        src={ currentDrink.strDrinkThumb }
        alt="imagem da bebida"
        data-testid="recipe-photo"
        className="detailImage"
      />
      <div className="detailsTitle bodyPadding">
        <h3 data-testid="recipe-title">{ currentDrink.strDrink }</h3>
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
          <FavoriteButton type="bebida" />
        </div>
      </div>
      <span
        data-testid="recipe-category"
        className="recipe-category bodyPadding"
      >
        { currentDrink.strAlcoholic }
      </span>
      <div className="bodyPadding">
        <h4>Ingredients</h4>
        <IngredientsList currentMeal={ currentDrink } />
        <h4>Instructions</h4>
        <p data-testid="instructions">{ currentDrink.strInstructions }</p>
      </div>
      <h4 className="bodyPadding">Recommended Meals</h4>
      <div className="carousel-list">
        {fullRecipes.map((meal, index) => (
          index < RECOMMENDED_LENGHT ? (
            <RecomendedMeals
              key={ index }
              recommendationId={ `${index}-recomendation-card` }
              mealImg={ meal.strMealThumb }
              mealName={ meal.strMeal }
              mealTitleId={ `${index}-recomendation-title` }
            />
          ) : (null)
        ))}
      </div>
      {textButton !== '' ? (
        <ButtonStartRecipe
          buttonText={ textButton }
          type="bebidas"
          id={ currentDrink.idDrink }
        />
      ) : (null)}
    </div>
  );
}

export default DrinkCardDetail;
