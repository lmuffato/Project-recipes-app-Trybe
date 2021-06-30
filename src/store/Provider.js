import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import context from './Context';
import {
  fetchFoodsAndCategories,
  fetchFoodsAndArea,
  fetchFoodsAndIngredients,
} from '../services/Data';

function Provider({ children }) {
  const [dataFetchFoodsAndCategories, setDatafetchFoodsAndCategories] = useState([]);
  const [dataFetchFoodsAndArea, setDataFetchFoodsAndArea] = useState([]);
  const [dataFetchFoodsAndIngredients, setDataFetchFoodsAndIngredients] = useState([]);
  const [infoUser, setDatainfoUser] = useState({
    email: '',
    password: '',
    shouldRedirect: false,
  });

  useEffect(() => {
    fetchFoodsAndCategories()
      .then(({ meals }) => setDatafetchFoodsAndCategories(meals));
    fetchFoodsAndArea()
      .then(({ meals }) => setDataFetchFoodsAndArea(meals));
    fetchFoodsAndIngredients()
      .then(({ meals }) => setDataFetchFoodsAndIngredients(meals));
  }, []);

  const contextValue = {
    dataFetchFoodsAndCategories,
    dataFetchFoodsAndArea,
    dataFetchFoodsAndIngredients,
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
