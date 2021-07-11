import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import myContext from './myContext';
import { fetchFoodsAPI, fetchFoodsCategoriesAPI } from '../services/fetchFoodsAPI';
import { fetchDrinksAPI, fetchDrinksCategoriesAPI } from '../services/fetchDrinksAPI';
import fetchFoodIngredientsAPI from '../services/fetchFoodIngredientsAPI';
import fetchDrinkIngredientsAPI from '../services/fetchDrinkIngredientsAPI';
import fetchFoodAreaAPI from '../services/fetchFoodsAreaAPI';

const RecipesProvider = ({ children }) => {
  const [recipesFoods, setRecipesFoods] = useState([]);
  const [auxRecipesFoods, setAuxRecipesFoods] = useState([]);
  const [recipesDrinks, setRecipesDrinks] = useState([]);
  const [auxRecipesDrinks, setAuxRecipesDrinks] = useState([]);
  const [foodIngredients, setFoodIngredients] = useState([]);
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [foodAreas, setFoodAreas] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [fetchFood, setFetchFood] = useState([]);
  const [fetchDrinks, setFetchDrinks] = useState([]);

  useEffect(() => {
    fetchFoodsAPI().then((meals) => {
      setRecipesFoods(meals);
    });
  }, []);

  useEffect(() => {
    fetchDrinksAPI().then((drinks) => {
      setRecipesDrinks(drinks);
    });
  }, []);

  useEffect(() => {
    fetchFoodIngredientsAPI().then((myFoodIngredients) => {
      setFoodIngredients(myFoodIngredients);
    });
  }, []);

  useEffect(() => {
    fetchDrinkIngredientsAPI().then((myDrinkIngredients) => {
      setDrinkIngredients(myDrinkIngredients);
    });
  }, []);

  useEffect(() => {
    fetchFoodAreaAPI().then((myAreas) => {
      setFoodAreas(myAreas);
    });
  }, []);

  useEffect(() => {
    fetchFoodsCategoriesAPI().then((categoriesFood) => {
      setFoodCategories(categoriesFood);
    });
  }, []);

  useEffect(() => {
    fetchDrinksCategoriesAPI().then((categoriesDrink) => {
      setDrinkCategories(categoriesDrink);
    });
  }, []);

  const context = {
    recipesFoods,
    setRecipesFoods,
    recipesDrinks,
    setRecipesDrinks,
    foodIngredients,
    drinkIngredients,
    foodAreas,
    foodCategories,
    drinkCategories,
    auxRecipesFoods,
    setAuxRecipesFoods,
    auxRecipesDrinks,
    setAuxRecipesDrinks,
    recipes: {
      food: fetchFood,
      drinks: fetchDrinks,
    },
    setFetchFood,
    setFetchDrinks,
  };

  return (
    <myContext.Provider value={ context }>
      {children}
    </myContext.Provider>
  );
};

RecipesProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipesProvider;
