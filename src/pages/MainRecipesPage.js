import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../compenents/Footer';
import MainRecipes from '../compenents/MainRecipes';
import RecipesContext from '../contexts/RecipesContext';
// import RecipeCard from '../compenents/RecipeCard';
import SearchbarContext from '../contexts/SearchbarContext';
import apiRequester from '../services/fetchApi';
import '../styles/MealAndDrinkCards.css';

function MainMealsRecipes() {
  // const [recipes, setRecipes] = useState(null); // Guarda as 25 receitas vindas da API, sendo um backup
  const [twelveRecipes, setTwelveRecipes] = useState(null);
  const [categories, setCategories] = useState(null);
  const [returnedCategoty, setReturnedCategory] = useState(null);
  // const [loading, setLoading] = useState(false);

  const {
    mealOrDrink, searchCategory, setSearchCategory,
  } = useContext(SearchbarContext);
  const { type, setType,
  } = useContext(RecipesContext);

  let recipes;
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
        // setRecipes(response); // Salva as 25 receitas retornadas da API, faz um backup
        setTwelveRecipes(Object.values(response)[0].slice(0, endpoints.lastRecipe));
        // setLoading(false);
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
  }, [type, searchCategory]);

  const handleFilter = ({ value }) => {
    if (searchCategory === value) {
      setSearchCategory('list');
    } else { setSearchCategory(value); }
  };

  if (searchCategory !== 'list') {
    recipes = returnedCategoty;
  } else { recipes = twelveRecipes; }

  if (recipes !== null && categories !== null) {
    return (
      <>
        <MainRecipes
          categories={ categories }
          recipes={ recipes }
          handleFilter={ handleFilter }
        />
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
