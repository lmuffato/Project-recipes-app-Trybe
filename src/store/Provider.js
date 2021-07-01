import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import context from './Context';
import {
  fetchFoodsAndArea,
  fetchFoodsAndIngredients,
  fetch12FirstFoods,
  fetch12FirstDrinks,
  fetchAllCategoriesFoods,
  fetchAllCategoriesDrinks,
} from '../services/Data';

function Provider({ children }) {
  const [dataFetchFoodsAndArea, setDataFetchFoodsAndArea] = useState([]);
  const [dataFetchFoodsAndIngredients, setDataFetchFoodsAndIngredients] = useState([]);
  const [dataFetch12FirstFoods, setDataFetch12FirstFoods] = useState([]);
  const [dataFetch12FirstDrinks, setDataFetch12FirstDrinks] = useState([]);
  const [dataFetchAllCategoriesFoods, setDataFetchAllCategoriesFoods] = useState([]);
  const [dataFetchAllCategoriesDrinks, setDataFetchAllCategoriesDrinks] = useState([]);
  const [infoUser, setDatainfoUser] = useState({
    email: '',
    password: '',
    shouldRedirect: false,
  });

  useEffect(() => {
    fetchFoodsAndArea()
      .then(({ meals }) => setDataFetchFoodsAndArea(meals));
    fetchFoodsAndIngredients()
      .then(({ meals }) => setDataFetchFoodsAndIngredients(meals));
    fetch12FirstFoods()
      .then(({ meals }) => setDataFetch12FirstFoods(meals));
    fetch12FirstDrinks()
      .then(({ drinks }) => setDataFetch12FirstDrinks(drinks));
    fetchAllCategoriesFoods()
      .then(({ meals }) => setDataFetchAllCategoriesFoods(meals));
    fetchAllCategoriesDrinks()
      .then(({ drinks }) => setDataFetchAllCategoriesDrinks(drinks));
  }, []);

  const contextValue = {
    dataFetchFoodsAndArea,
    dataFetchFoodsAndIngredients,
    foods: dataFetch12FirstFoods,
    drinks: dataFetch12FirstDrinks,
    catFoods: dataFetchAllCategoriesFoods,
    catDrinks: dataFetchAllCategoriesDrinks,
    infoUser,
    setDatainfoUser,
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
