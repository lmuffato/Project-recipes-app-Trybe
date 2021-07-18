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
  const [completedFil, setCompletedFill] = useState('All');
  const [favoritedFil, setFavoritedFill] = useState('All');

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
    completedFil,
    setCompletedFill,
    favoritedFil,
    setFavoritedFill,
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
