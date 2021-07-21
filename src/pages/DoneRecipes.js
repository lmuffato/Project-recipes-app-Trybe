import React, { useEffect } from 'react';
// import { useStateEasyRedux } from 'easy-redux-trybe';
// import { useHistory } from 'react-router-dom';
// import copy from 'clipboard-copy';
import Header from '../components/Header';
import { setLocalStorage, getLocalStorage } from '../helper';
// import positions from '../../services/data';
// import { checkIngredients } from '../../services/functions';
// import shareIcon from '../../images/shareIcon.svg';
// import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../../images/blackHeartIcon.svg';

function DoneRecipes() {
  // const [doneRecipes, setDoneRecipes] = useStateEasyRedux({ name: 'doneRecipes' }, {});

  // const getRecipeStorage = () => {
  //   const getStorage = getLocalStorage('inProgressRecipes');

  //   if (getStorage.meals.isDone || getStorage.cocktails.isDone) {

  //   }
  // };

  const doneRecipesStorage = getLocalStorage('doneRecipes')
    ? getLocalStorage('doneRecipes') : [];

  const getStorage = getLocalStorage('inProgressRecipes');

  const fetchMeal = async (id) => {
    const requestFood = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

    const dataFood = await requestFood;

    const resultFood = await dataFood.json();
    const responseFood = resultFood.meals;
    const doneMealObj = [
      ...doneRecipesStorage,
      {
        id: responseFood[0].idMeal,
        type: 'comida',
        area: responseFood[0].strArea,
        category: responseFood[0].strCategory,
        alcoholicOrNot: '',
        name: responseFood[0].strMeal,
        image: responseFood[0].strMealThumb,
      }];
    setLocalStorage('doneRecipes', doneMealObj);
  };

  const fetchDrink = async (id) => {
    const requestDrink = fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

    const dataDrink = await requestDrink;

    const resultDrink = await dataDrink.json();
    const responseDrink = resultDrink.drinks;
    const doneDrinkObj = [
      ...doneRecipesStorage,
      {
        id: responseDrink[0].idDrink,
        type: 'bebida',
        area: responseDrink[0].strArea,
        category: responseDrink[0].strCategory,
        alcoholicOrNot: responseDrink[0].strAlcoholic,
        name: responseDrink[0].strDrink,
        image: responseDrink[0].strDrinkThumb,
      }];
    setLocalStorage('doneRecipes', doneDrinkObj);
  };

  useEffect(() => {
    if (getStorage.meals.isDone && getStorage.cocktails.isDone) {
      const mealID = Object.keys(getStorage.meals)[0];
      const cocktailID = Object.keys(getStorage.cocktails)[0];
      fetchMeal(mealID);
      fetchDrink(cocktailID);
    } else if (getStorage.meals.isDone) {
      const mealID = Object.keys(getStorage.meals)[0];
      fetchMeal(mealID);
    } else if (getStorage.cocktails.isDone) {
      const cocktailID = Object.keys(getStorage.cocktails)[0];
      fetchDrink(cocktailID);
    }
  }, []);

  return (
    <div>
      <Header title="Receitas Feitas" />
      Vamos tentar de novo??
    </div>
  );
}

export default DoneRecipes;
