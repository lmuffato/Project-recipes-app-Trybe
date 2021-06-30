import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import Context from './Context';
import {
  fetchApiDrinks,
  fetchApiFoods,
  fetchCategoryFoods,
  fetchCategoryDrinks,
  fetchFilterFoods } from '../services/fetchApi';

function Provider({ children }) {
  // useStates...
  const [logout, setLogout] = useState(false);
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [categoryFoods, setCategoryFoods] = useState([]);
  const [categoryDrinks, setCategoryDrinks] = useState([]);
  const [filterFoods, setFilterFoods] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  function getFoods() {
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
  }

  const handleClick = (e) => {
    if (e.target.innerText !== 'All') {
      setShowFilter(true);
      setFilterFoods([]);
      const getCategoryFoods = async () => {
        const data = await fetchFilterFoods(e.target.innerText);
        setFilterFoods(data);
      };
      getCategoryFoods();
    } else {
      setShowFilter(false);
    }
    // console.log(filterFoods);
  };

  // ComponentDidMount
  useEffect(getFoods, []);

  const dataValue = {
    logout,
    setLogout,
    foods,
    drinks,
    categoryFoods,
    categoryDrinks,
    filterFoods,
    handleClick,
    showFilter,
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
