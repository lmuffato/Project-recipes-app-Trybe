import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import shareIcon from '../images/shareIcon.svg';
import FavoriteButton from './FavoriteButton';
import IngredientsList from './IngredientsList';
import RecomendedMeals from './RecomendedMeals';
import { fetchRandonMeal } from '../services/getApis';
import SearchContext from '../context/SearchContext';
import { getItemFromLocalStorage } from '../services/localStorage';
import ButtonStartRecipe from './ButtonStartRecipe';
import { recipeDrinkRow } from '../services/recipeRow';

const copy = require('clipboard-copy');

function DrinkCardDetail() {
  const { currentDrink } = useContext(UserContext);
  const { fullRecipes } = useContext(SearchContext);
  const [copyLink, setCopyLink] = useState(false);
  const [recomendedMeals, setRecomendedMeals] = useState([]);
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
    const MEALS_NUMBER = 6;
    const getRandonDrink = async () => {
      const result = await fetchRandonMeal();
      setRecomendedMeals([...recomendedMeals, result.meals[0]]);
    };
    if (recomendedMeals.length < MEALS_NUMBER) getRandonDrink();
  }, [recomendedMeals]);

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
    <div>
      <img
        src={ currentDrink.strDrinkThumb }
        alt="imagem da bebida"
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-title">{ currentDrink.strDrink }</h3>
      <button data-testid="share-btn" type="button" onClick={ shareClick }>
        <img src={ shareIcon } alt="compartilhar" />
      </button>
      {copyLink ? <span>Link copiado!</span> : null}
      <FavoriteButton type="bebida" />
      <h4 data-testid="recipe-category">{ currentDrink.strAlcoholic }</h4>
      <h4>Ingredients</h4>
      <IngredientsList currentMeal={ currentDrink } />
      <h4>Instructions</h4>
      <span data-testid="instructions">{ currentDrink.strInstructions }</span>
      <h4>Recommended Meals</h4>
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
