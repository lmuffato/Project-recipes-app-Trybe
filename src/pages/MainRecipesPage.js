import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../compenents/Header';
import Footer from '../compenents/Footer';
import MainRecipes from '../compenents/MainRecipes';
import RecipesContext from '../contexts/RecipesContext';
import SearchbarContext from '../contexts/SearchbarContext';
import apiRequester from '../services/fetchApi';
import '../styles/MealAndDrinkCards.css';

function MainMealsRecipes() {
  const [twelveRecipes, setTwelveRecipes] = useState(null);
  const [returnedCategoty, setReturnedCategory] = useState(null);

  const {
    searchCategory, categories, setCategories,
  } = useContext(SearchbarContext);
  const { mealOrDrink, type, setType, setRecipes, recipes,
  } = useContext(RecipesContext);

  const history = useHistory();

  if (history.location.pathname === '/bebidas' || mealOrDrink === 'cocktail') {
    setType('cocktail');
  } else if (history.location.pathname === '/comidas' || mealOrDrink === 'meal') {
    setType('meal');
  }

  useEffect(() => {
    const endpoints = {
      endpointMealOrDrink: `https://www.the${type}db.com/api/json/v1/1/search.php?s=`,
      lastRecipe: 12,
      endpointCategories: `https://www.the${type}db.com/api/json/v1/1/list.php?c=list`,
      lastCategory: 5,
      endpointCategory: `https://www.the${type}db.com/api/json/v1/1/filter.php?c=${searchCategory}`,
    };

    apiRequester(endpoints.endpointMealOrDrink)
      .then((response) => {
        setTwelveRecipes(Object.values(response)[0].slice(0, endpoints.lastRecipe));
      });

    apiRequester(endpoints.endpointCategories)
      .then((response) => {
        setCategories(Object.values(response)[0].slice(0, endpoints.lastCategory));
      });

    if (searchCategory !== 'list') {
      apiRequester(endpoints.endpointCategory)
        .then((response) => {
          setReturnedCategory(Object.values(response)[0]
            .splice(0, endpoints.lastRecipe));
        });
    }
  }, [type, searchCategory, setCategories]);

  if (searchCategory !== 'list') {
    setRecipes(returnedCategoty);
  } else { setRecipes(twelveRecipes); }

  if (recipes !== null && categories !== null) {
    return (
      <>
        <Header />
        <MainRecipes />
        <Footer />
      </>
    );
  }
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}

export default MainMealsRecipes;
