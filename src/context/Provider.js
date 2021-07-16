import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [mealsList, setMealsList] = useState([]);
  const [drinkList, setDrinkList] = useState([]);
  const [drinksList, setDrinksList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [catList, setCatList] = useState([]);
  const [category, setCategory] = useState('All');
  const [filtredList, setFiltredList] = useState([]);
  const [ingredFromExplore, setIngredFromExplore] = useState('');
  const [fromExplore, setFromExplore] = useState(false);

  const [drinksId, setDrinksId] = useState([]);
  const [drinksIngredientsId, setDrinksIngredientsId] = useState([]);
  const [drinksMeasuresId, setDrinksMeasuresId] = useState([]);
  const [mealsId, setMealsId] = useState([]);
  const [mealsIngredientsId, setMealsIngredientsId] = useState([]);
  const [mealsMeasuresId, setMealsMeasuresId] = useState([]);
  const [inProgressDrinksId, setInProgressDrinksId] = useState([]);
  const [inProgressMealsId, setInProgressMealsId] = useState([]);
  const store = {
    userEmail,
    password,
    setUserEmail,
    setPassword,
    isDisabled,
    setIsDisabled,
    mealsList,
    setMealsList,
    drinkList,
    setDrinkList,
    isLoading,
    setLoading,
    drinksList,
    setDrinksList,
    catList,
    setCatList,
    category,
    setCategory,
    filtredList,
    setFiltredList,
    ingredFromExplore,
    setIngredFromExplore,
    fromExplore,
    setFromExplore,
    drinksId,
    setDrinksId,
    drinksIngredientsId,
    setDrinksIngredientsId,
    drinksMeasuresId,
    setDrinksMeasuresId,
    mealsId,
    mealsIngredientsId,
    mealsMeasuresId,
    setMealsId,
    setMealsIngredientsId,
    setMealsMeasuresId,
    inProgressDrinksId,
    setInProgressDrinksId,
    inProgressMealsId,
    setInProgressMealsId,
  };

  return (
    <Context.Provider value={ store }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
