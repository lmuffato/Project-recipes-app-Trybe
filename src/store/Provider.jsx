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
  const [dataCategoriesFoods, setDataCategoriesFoods] = useState([]);
  const [dataCategoriesDrinks, setDataCategoriesDrinks] = useState([]);
  const [infoUser, setDatainfoUser] = useState({
    email: '',
    password: '',
    shouldRedirect: false,
  });
  const [categoryF, setCategoryF] = useState('All');
  const [categoryD, setCategoryD] = useState('All');
  const [dataMealsAndCategory, setDataMealsAndCategory] = useState([]);
  const [dataDrinksAndCategory, setDrinksAndCategory] = useState([]);

  useEffect(() => {
    fetchAllCategoriesFoods()
      .then(({ meals }) => setDataCategoriesFoods(meals));
    fetchAllCategoriesDrinks()
      .then(({ drinks }) => setDataCategoriesDrinks(drinks));
  }, []);

  useEffect(() => {
    if (categoryF === 'All') {
      fetchAllFoods()
        .then(({ meals }) => setDataMealsAndCategory(meals));
    } else {
      fetchMealsAndCategory(categoryF)
        .then(({ meals }) => setDataMealsAndCategory(meals));
    }
  }, [categoryF]);

  useEffect(() => {
    if (categoryD === 'All') {
      fetchAllDrinks()
        .then(({ drinks }) => setDrinksAndCategory(drinks));
    } else {
      fetchDrinksAndCategory(categoryD)
        .then(({ drinks }) => setDrinksAndCategory(drinks));
    }
  }, [categoryD]);

  const contextValue = {
    foods: dataMealsAndCategory,
    drinks: dataDrinksAndCategory,
    catFoods: dataCategoriesFoods,
    catDrinks: dataCategoriesDrinks,
    setDrinks: setDrinksAndCategory,
    setFoods: setDataMealsAndCategory,
    infoUser,
    setDatainfoUser,
    categoryF,
    setCategoryF,
    categoryD,
    setCategoryD,
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
