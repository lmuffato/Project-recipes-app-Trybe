import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../context/UserContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import IngredientsList from './IngredientsList';
import RecomendedMeals from './RecomendedMeals';
import { fetchRandonMeal } from '../services/getApis';
import SearchContext from '../context/SearchContext';
import { getItemFromLocalStorage } from '../services/localStorage';
import ButtonStartRecipe from './ButtonStartRecipe';
import { recipeDrinkRow } from '../services/recipeRow';

function DrinkCardDetail() {
  const { currentDrink } = useContext(UserContext);
  const { fullRecipes } = useContext(SearchContext);
  const [recomendedMeals, setRecomendedMeals] = useState([]);
  const [textButton, setTextButton] = useState('Iniciar Receita');
  const donedRecipes = getItemFromLocalStorage('doneRecipes');
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
  // if (donedRecipes) {
  //   const findDonedRecipe = donedRecipes.find(({ id }) => {
  //     const { idDrink } = currentDrink;
  //     return id === idDrink;
  //   });
  //   if (findDonedRecipe) buttonIniciarReceita = '';
  // }

  return (
    <div>
      <img
        src={ currentDrink.strDrinkThumb }
        alt="imagem da bebida"
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-title">{ currentDrink.strDrink }</h3>
      <button data-testid="share-btn" type="button">
        <img src={ shareIcon } alt="compartilhar" />
      </button>
      <button data-testid="favorite-btn" type="button">
        <img src={ whiteHeartIcon } alt="favoritar" />
      </button>
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
        <ButtonStartRecipe buttonText={ textButton } />
      ) : (null)}
    </div>
  );
}

export default DrinkCardDetail;
