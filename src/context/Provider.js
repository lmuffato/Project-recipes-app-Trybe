import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import {
  fetchApiDrinks,
  fetchApiFoods,
  fetchCategoryFoods,
  fetchCategoryDrinks,
  fetchFilterFoods,
  fetchFilterDrinks,
  fetchRecipeFood,
  fetchRecipeDrink,
  fetchFoodsRecommended,
  fetchDrinksRecommended } from '../services/fetchApi';
import Context from './Context';

// import { fetchApiDrinks } from '../services/fetchApi';

import { checkExist }
  from '../pages/DetailsPages/components/buttons/ButtonMakeRecipeDrink';

import setProgressRecipesLS from '../services/localStorage/setProgressRecipesLS';
// fetchFilterDrinks } from '../services/fetchApi';
import Mock from '../services/mokcInformation';

function Provider({ children }) {
  // useStates...
  const [logout, setLogout] = useState(false);
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [categoryFoods, setCategoryFoods] = useState([]);
  const [categoryDrinks, setCategoryDrinks] = useState([]);
  const [filterFoods, setFilterFoods] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterDrinks, setFilterDrinks] = useState([]);
  const [category, setCategory] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState(false);
  const [recipeFood, setRecipeFood] = useState({ });
  const [recipeDrink, setRecipeDrink] = useState({ });
  const [foodRecommended, setFoodRecommended] = useState([]);
  const [drinkRecommended, setDrinkRecommended] = useState([]);
  const [progressRecipes, setProgressRecipes] = useState([]);
  // function getFoods() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [doneFilterRecipes, setDoneFilter] = useState([]);

  function getInFormations() {
    // const informationLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'))
    const fetchApis = async () => {
      const dataFoods = await fetchApiFoods();
      const dataDrinks = await fetchApiDrinks();
      const categoryFood = await fetchCategoryFoods();
      const categoryDrink = await fetchCategoryDrinks();
      setCategoryFoods(categoryFood);
      setFoods(dataFoods);
      setCategoryDrinks(categoryDrink);
      setDrinks(dataDrinks);
    };
    fetchApis();
    setDoneRecipes(Mock);
  }

  const clickFilterFood = (e) => {
    setCategory(e.target.innerText);
    if (e.target.innerText !== 'All') {
      setShowFilter(true);
      setFilterFoods([]);
      const getCategoryFoods = async () => {
        const data = await fetchFilterFoods(e.target.innerText);
        setFilterFoods(data);
      };
      getCategoryFoods();
    } if (category === e.target.innerText) {
      setShowFilter(false);
    } if (e.target.innerText === 'All') {
      setShowFilter(false);
    }
  };

  const clickFilterDrinks = (e) => {
    setCategory(e.target.innerText);
    if (e.target.innerText !== 'All') {
      setShowFilter(true);
      setFilterDrinks([]);
      const getCategoryDrinks = async () => {
        const data = await fetchFilterDrinks(e.target.innerText);
        setFilterDrinks(data);
      };
      getCategoryDrinks();
    }
    if (category === e.target.innerText) {
      setShowFilter(false);
    }
    if (e.target.innerText === 'All') {
      setShowFilter(false);
    }
  };

  const clickRecipeFood = (id) => { // JSON da receita em si, para pagina de Details.
    const getRecipeFood = async (idFood) => {
      const data = await fetchRecipeFood(idFood);
      setRecipeFood(data);
    };
    getRecipeFood(id);
  };

  const clickRecipeDrinks = (id) => { // JSON da receita em si, para pagina Details
    const getRecipeDrink = async (idDrink) => {
      const data = await fetchRecipeDrink(idDrink);
      setRecipeDrink(data);
    };
    getRecipeDrink(id);
  };

  function foodsRecommendedF() { // funcao q busca comidas recomendadas e seta na variavel global.
    const fetchAsync = async () => {
      const data = await fetchFoodsRecommended();
      setFoodRecommended(data);
    };
    fetchAsync();
  }

  function drinksRecommendedF() { // funcao q busca drinks recomendados e seta na var global.
    const fetchAsync = async () => {
      const data = await fetchDrinksRecommended();
      setDrinkRecommended(data);
    };
    fetchAsync();
  }

  function clickSetProgress(progress, id, type, recipe) {
    console.log(id);
    // verificar se o id já está em progresso... (progressRecipes => useState)
    if (progress === 'in') { //
      checkExist(id, progressRecipes);
      setProgressRecipes([...progressRecipes, { id, progress, type }]);
      setProgressRecipesLS(recipe);
    }
    if (progress === 'done') {
      setProgressRecipes({ id, progress, type });
      // copia tudo que há no progressRecipe, mas altera o obj q tem recebe o id. (maybe)
    }
  }

  function initProgressInLS() {
    if (localStorage.getItem('inProgressRecipes')) return null;
    localStorage.setItem('inProgressRecipes',
      JSON.stringify({ cocktails: {}, meals: {} }));
  }

  function initDoneRecipesInLS() {
    if (localStorage.getItem('doneRecipes')) return null;
    localStorage.setItem('doneRecipes', JSON.stringify([]));
  }

  function initFavRecipesInLS() {
    if (localStorage.getItem('favoriteRecipes')) return null;
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
  // ComponentDidMount
  useEffect(() => {
    getInFormations();
    // getFoods();
    foodsRecommendedF();
    drinksRecommendedF();
    initProgressInLS();
    initDoneRecipesInLS();
    initFavRecipesInLS();
  }, []);
  const doneFilter = (e) => {
    const { innerText } = e.target;
    setDoneFilter([]);
    if (innerText === 'All') {
      setShowFilter(false);
      setDoneRecipes(Mock);
      setDoneFilter([]);
    }
    if (innerText === 'Food') {
      setShowFilter(true);
      const newRecipes = doneRecipes
        .filter((recipe) => (recipe.type === 'comida') && recipe);
      setDoneFilter(newRecipes);
    }
    if (innerText === 'Drinks') {
      setShowFilter(true);
      const newRecipes = doneRecipes
        .filter((recipe) => (recipe.type === 'bebida') && recipe);
      setDoneFilter(newRecipes);
    }
  };
    // ComponentDidMount
  // useEffect(getInFormations, []);

  const dataValue = {
    logout,
    setLogout,
    foods,
    drinks,
    categoryFoods,
    categoryDrinks,
    filterFoods,
    filterDrinks,
    clickFilterFood,
    clickFilterDrinks,
    clickRecipeFood,
    clickRecipeDrinks,
    showFilter,
    email,
    setEmail,
    password,
    setPassword,
    search,
    setSearch,
    recipeFood,
    recipeDrink,
    setRecipeFood,
    foodRecommended,
    drinkRecommended,
    progressRecipes,
    setProgressRecipes,
    clickSetProgress,
    doneRecipes,
    doneFilter,
    doneFilterRecipes,
  };

  return (
    <Context.Provider value={ dataValue }>
      { children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: node,
}.isRequired;

export default Provider;
