import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player'; // https://dev.to/marcelomatosdev/react-adding-a-video-player-to-play-youtube-videos-in-your-project-30p
import ShareBtn from './componentsDetails/ShareBtn';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { foodById } from '../services/apiRequests';
import DrinksRecomends from './componentsDetails/DrinksRecomends';
import BtnInitiateRecipe from './componentsDetails/BtnInitiateRecipe';

export default function RecipeCardDetailFood() {
  const [foodDetails, setFoodDetails] = useState({});
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState('Iniciar Receita');
  const { idMeal } = useParams();

  useEffect(() => {
    const fetchFood = async () => {
      const food = await foodById(idMeal);
      setFoodDetails(food);
    };
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      const isFavorite = () => favoriteRecipes
        .some((recipe) => recipe.id === idMeal) && document.getElementById('fav-btn')
        .setAttribute('src', blackHeartIcon);
      isFavorite();
    }
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes && inProgressRecipes.meals) {
      const wasStarted = Object.keys(inProgressRecipes.meals).some((id) => id === idMeal);
      const progressChecker = () => wasStarted && setProgress('Continuar Receita');
      progressChecker();
    }
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      const wasDone = doneRecipes.some((doneRecipe) => doneRecipe.id === idMeal);
      const doneChecker = () => wasDone && setDone(true);
      doneChecker();
    }
    fetchFood();
  }, [idMeal]);

  const retObj = Object.entries(foodDetails);
  const listIngredients = retObj.filter((meal) => (
    meal[0].includes('Ingredient') && meal[1]
  ));
  const filterAlcoohol = retObj.filter((meal) => {
    const noAlcool = meal[1] !== ' ' && meal[1] !== null;
    return meal[0].includes('Measure') && noAlcool;
  });

  const setFavorite = () => {
    const { strArea, strCategory, strMealThumb, strMeal } = foodDetails;

    const favoriteRecipeToken = {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };

    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      if (favoriteRecipes.some((recipe) => recipe.id !== favoriteRecipeToken.id)) {
        favoriteRecipes.push(favoriteRecipeToken);
        document.getElementById('fav-btn').setAttribute('src', blackHeartIcon);
      } else {
        favoriteRecipes = favoriteRecipes
          .filter((recipe) => recipe.id !== favoriteRecipeToken.id);
        document.getElementById('fav-btn').setAttribute('src', whiteHeartIcon);
      }
    } else {
      favoriteRecipes = [favoriteRecipeToken];
      console.log(process.env);
      document.getElementById('fav-btn').src = blackHeartIcon;
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    if (Object.values(favoriteRecipes).length === 0) {
      localStorage.removeItem('favoriteRecipes');
    }
  };

  return (
    <div>
      <img
        src={ foodDetails.strMealThumb }
        alt="imagem da comida"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ foodDetails.strMeal }</h1>

      <ShareBtn id={ idMeal } type="comida" />

      <button type="button" onClick={ setFavorite }>
        <img
          id="fav-btn"
          src={ whiteHeartIcon }
          alt="favoritar"
          data-testid="favorite-btn"
        />
      </button>

      <h2 data-testid="recipe-category">{ foodDetails.strCategory }</h2>
      <h3>Ingredientes:</h3>
      <ul>
        {listIngredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {filterAlcoohol[index] ? (
              `${ingredient[1]} - ${filterAlcoohol[index][1]}`
            ) : (ingredient[1])}
          </li>
        ))}
      </ul>
      <h4>Instructions: </h4>
      <h2 data-testid="instructions">{ foodDetails.strInstructions }</h2>
      <ReactPlayer
        data-testid="video"
        url={ foodDetails.strYoutube }
      />
      <DrinksRecomends />
      { !done && <BtnInitiateRecipe id={ idMeal } type="comida" progress={ progress } />}
    </div>
  );
}
