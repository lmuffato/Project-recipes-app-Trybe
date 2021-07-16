import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../compenents/Footer';
import MainRecipes from '../compenents/MainRecipes';
import RecipesContext from '../contexts/RecipesContext';
import SearchbarContext from '../contexts/SearchbarContext';
import apiRequester from '../services/fetchApi';
import '../styles/MealAndDrinkCards.css';
// import '../styles/Main.css';
import Loading from '../compenents/Loading';
import Header from '../compenents/Header';

function MainRecipesPage() {
  const [twelveRecipes, setTwelveRecipes] = useState(null);
  const [returnedCategoty, setReturnedCategory] = useState(null);

  const {
    searchCategory, categories, setCategories, setHideSearchBtn, setPageName,
  } = useContext(SearchbarContext);
  const { mealOrDrink, type, setType, setRecipes, recipes,
  } = useContext(RecipesContext);

  const history = useHistory();

  useEffect(() => {
    if (history.location.pathname === '/bebidas' || mealOrDrink === 'cocktail') {
      setType('cocktail');
      setPageName('Bebidas');
    } else if (history.location.pathname === '/comidas' || mealOrDrink === 'meal') {
      setType('meal');
      setPageName('Comidas');
    }
  }, [history, mealOrDrink, setType]);

  useEffect(() => {
    setHideSearchBtn(true);
  }, []);

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
      })
      .catch((error) => console.error(error));

    apiRequester(endpoints.endpointCategories)
      .then((response) => {
        setCategories(Object.values(response)[0].slice(0, endpoints.lastCategory));
      })
      .catch((error) => console.error(error));

    if (searchCategory !== 'list') {
      apiRequester(endpoints.endpointCategory)
        .then((response) => {
          setReturnedCategory(Object.values(response)[0]
            .splice(0, endpoints.lastRecipe));
        })
        .catch((error) => console.error(error));
    }
  }, [type, searchCategory, setCategories]);

  useEffect(() => {
    if (searchCategory !== 'list') {
      setRecipes(returnedCategoty);
    } else { setRecipes(twelveRecipes); }
  }, [searchCategory, returnedCategoty, twelveRecipes, setRecipes]);

  return (
    <>
      <Header />
      { recipes && categories ? <MainRecipes /> : <Loading />}
      <Footer />
    </>
  );
}

export default MainRecipesPage;
