import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ShareBtn from './componentsDetails/ShareBtn';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { drinkById } from '../services/apiRequests';
import FoodsRecomends from './componentsDetails/FoodsRecomends';
import './DetailsScreen.css';
import BtnInitiateRecipe from './componentsDetails/BtnInitiateRecipe';

export default function RecipeCardDetailDrink() {
  const [drinkDetails, setDrinkDetails] = useState({});
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState('Iniciar Receita');
  const { idDrink } = useParams();
  console.log(drinkDetails);
  useEffect(() => {
    const fetchDrink = async () => {
      const drink = await drinkById(idDrink);
      setDrinkDetails(drink);
    };
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      const isFavorite = () => favoriteRecipes
        .some((recipe) => recipe.id === idDrink) && document.getElementById('fav-btn')
        .setAttribute('src', blackHeartIcon);
      isFavorite();
    }
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes && inProgressRecipes.cocktails) {
      const wasStarted = Object.keys(inProgressRecipes.cocktails)
        .some((id) => id === idDrink);
      const progressChecker = () => wasStarted && setProgress('Continuar Receita');
      progressChecker();
    }
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      const wasDone = doneRecipes.some((doneRecipe) => doneRecipe.id === idDrink);
      const doneChecker = () => wasDone && setDone(true);
      doneChecker();
    }
    fetchDrink();
  }, [idDrink]);

  const retObj = Object.entries(drinkDetails);
  const listIngredients = retObj.filter((meal) => (
    meal[0].includes('Ingredient') && meal[1]
  ));
  const filterAlcoohol = retObj.filter((meal) => {
    const noAlcool = meal[1] !== ' ' && meal[1] !== null;
    return meal[0].includes('Measure') && noAlcool;
  });
  const setFavorite = () => {
    const { strDrinkThumb, strDrink, strAlcoholic, strCategory } = drinkDetails;

    const favoriteRecipeToken = {
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };

    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      if (favoriteRecipes.every((recipe) => recipe.id !== favoriteRecipeToken.id)) {
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
      document.getElementById('fav-btn').setAttribute('src', blackHeartIcon);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    if (Object.values(favoriteRecipes).length === 0) {
      localStorage.removeItem('favoriteRecipes');
    }
  };

  return (
    <div>
      <img
        src={ drinkDetails.strDrinkThumb }
        alt="imagem da bebida"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ drinkDetails.strDrink }</h1>
      <ShareBtn id={ idDrink } type="bebida" />
      <button type="button" onClick={ setFavorite }>
        <img
          id="fav-btn"
          src={ whiteHeartIcon }
          alt="favoritar"
          data-testid="favorite-btn"
        />
      </button>
      <h2 data-testid="recipe-category">{ drinkDetails.strAlcoholic }</h2>
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
      <h2 data-testid="instructions">{ drinkDetails.strInstructions }</h2>
      <FoodsRecomends />
      {!done && <BtnInitiateRecipe id={ idDrink } type="bebida" progress={ progress } />}
    </div>
  );
}
