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
  const [drinksId, setDrinksId] = useState([]);
  const [mealsId, setMealsId] = useState([]);

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
    setDrinksId,
    drinksId,
    mealsId,
    setMealsId,
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
