import React, { useEffect } from 'react';
import { useStateEasyRedux } from 'easy-redux-trybe';
import Header from '../components/Header';
import { setLocalStorage, getLocalStorage } from '../helper';
import DoneRecipeCard from '../components/DoneRecipeCard';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useStateEasyRedux(DoneRecipes, []);
  const doneRecipesStorage = getLocalStorage('doneRecipes')
    ? getLocalStorage('doneRecipes') : [];

  const getStorage = getLocalStorage('inProgressRecipes')
    ? getLocalStorage('inProgressRecipes') : false;

  const fetchMeal = async (id) => {
    if (getStorage.meals.isDone) {
      const requestFood = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

      const dataFood = await requestFood;

      const resultFood = await dataFood.json();
      const responseFood = resultFood.meals;
      const getDoneRecipe = doneRecipesStorage.filter((doneRecipe) => (
        doneRecipe.id !== id));
      const doneMealObj = [
        ...getDoneRecipe,
        {
          id: responseFood[0].idMeal,
          type: 'comida',
          area: responseFood[0].strArea,
          category: responseFood[0].strCategory,
          alcoholicOrNot: '',
          name: responseFood[0].strMeal,
          image: responseFood[0].strMealThumb,
          doneDate: new Date(),
          tags: (responseFood[0].strTags).split(','),
        }];
      setLocalStorage('doneRecipes', doneMealObj);
      setDoneRecipes({ recipes: doneMealObj });
    }
  };

  const fetchDrink = async (id) => {
    if (getStorage.cocktails.isDone) {
      const requestDrink = fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

      const dataDrink = await requestDrink;

      const resultDrink = await dataDrink.json();
      const responseDrink = resultDrink.drinks;
      const getDoneRecipe = doneRecipesStorage.filter((doneRecipe) => (
        doneRecipe.id !== id));
      const doneDrinkObj = [
        ...getDoneRecipe,
        {
          id: responseDrink[0].idDrink,
          type: 'bebida',
          area: responseDrink[0].strArea,
          category: responseDrink[0].strCategory,
          alcoholicOrNot: responseDrink[0].strAlcoholic,
          name: responseDrink[0].strDrink,
          image: responseDrink[0].strDrinkThumb,
          doneDate: new Date(),
          tags: [],
        }];
      setLocalStorage('doneRecipes', doneDrinkObj);
      setDoneRecipes({ recipes: doneDrinkObj });
    }
  };

  useEffect(() => {
    if (getStorage.meals) {
      const mealID = Object.keys(getStorage.meals)[0];
      fetchMeal(mealID);
    } else if (getStorage.cocktails) {
      const cocktailID = Object.keys(getStorage.cocktails)[0];
      fetchDrink(cocktailID);
    } else if (getStorage.meals && getStorage.cocktails) {
      const mealID = Object.keys(getStorage.meals)[0];
      const cocktailID = Object.keys(getStorage.cocktails)[0];
      fetchMeal(mealID);
      fetchDrink(cocktailID);
    } else if (!doneRecipesStorage) {
      setLocalStorage('doneRecipes', []);
    }
  }, []);

  return (
    <div>
      <Header title="Receitas Feitas" />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      { doneRecipes && doneRecipesStorage.map((doneRecipe, index) => (
        DoneRecipeCard(doneRecipe, index)
      ))}
    </div>
  );
}

export default DoneRecipes;
