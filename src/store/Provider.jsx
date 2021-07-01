import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import context from './Context';
import {
  fetchAllFoods,
  fetchAllDrinks,
  fetchAllCategoriesFoods,
  fetchAllCategoriesDrinks,
  fetchMealsAndCategory,
  fetchDrinksAndCategory,
} from '../services/Data';

function Provider({ children }) {
  const [dataFetchAllFoods, setDataFetchAllFoods] = useState([]);
  const [dataFetchAllDrinks, setDataFetchAllDrinks] = useState([]);
  const [dataFetchAllCategoriesFoods, setDataFetchAllCategoriesFoods] = useState([]);
  const [dataFetchAllCategoriesDrinks, setDataFetchAllCategoriesDrinks] = useState([]);
  const [infoUser, setDatainfoUser] = useState({
    email: '',
    password: '',
    shouldRedirect: false,
  });
  const [categoryF, setCategoryF] = useState('');
  const [categoryD, setCategoryD] = useState('');
  const [dataMealsAndCategory, setDataMealsAndCategory] = useState([]);
  const [dataDrinksAndCategory, setDrinksAndCategory] = useState([]);

  useEffect(() => {
    fetchAllFoods()
      .then(({ meals }) => setDataFetchAllFoods(meals));
    fetchAllDrinks()
      .then(({ drinks }) => setDataFetchAllDrinks(drinks));
    fetchAllCategoriesFoods()
      .then(({ meals }) => setDataFetchAllCategoriesFoods(meals));
    fetchAllCategoriesDrinks()
      .then(({ drinks }) => setDataFetchAllCategoriesDrinks(drinks));
  }, []);

  useEffect(() => {
    fetchMealsAndCategory(categoryF)
      .then(({ meals }) => setDataMealsAndCategory(meals));
  }, [categoryF]);

  useEffect(() => {
    console.log(categoryD);
    fetchDrinksAndCategory(categoryD)
      .then(({ drinks }) => setDrinksAndCategory(drinks));
  }, [categoryD]);

  const contextValue = {
    foods: dataFetchAllFoods,
    drinks: dataFetchAllDrinks,
    catFoods: dataFetchAllCategoriesFoods,
    catDrinks: dataFetchAllCategoriesDrinks,
    infoUser,
    setDatainfoUser,
    categoryF,
    setCategoryF,
    categoryD,
    setCategoryD,
    foodsAndCategory: dataMealsAndCategory,
    drinksAndCategory: dataDrinksAndCategory,
  };

  return (
    <context.Provider value={ contextValue }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: node,
}.isRequired;

export default Provider;
