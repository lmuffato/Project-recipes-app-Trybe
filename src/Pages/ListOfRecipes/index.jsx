import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import Header from '../../Components/Header';
import ButtonByCategory from '../../Components/ButtonByCategory';
import FavoritesCard from '../../Components/FavoritesCard';
import DoneRecipeCard from '../../Components/DoneRecipeCard';

function ListOfRecipes({ header }) {
  const recipesFromStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const doneFromStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [favRecStorage, setFavRecipesStorage] = useState(recipesFromStorage);
  const [doneRecipes, setDoneRecipes] = useState(doneFromStorage);
  const { pathname } = useLocation();
  const pathnameChange = pathname.includes('receitas-favoritas');

  const filterDrinks = (evt) => {
    evt.preventDefault();
    const favDrinks = recipesFromStorage.filter((recipe) => recipe.type === 'bebida');
    const donDrinks = doneRecipes.filter((recipe) => recipe.type === 'bebida');
    if (pathnameChange) {
      return setFavRecipesStorage(favDrinks);
    }
    return setDoneRecipes(donDrinks);
  };
  const filterFoods = (evt) => {
    evt.preventDefault();
    const favFoods = recipesFromStorage.filter((recipe) => recipe.type === 'comida');
    const donFoods = doneRecipes.filter((recipe) => recipe.type === 'comida');
    if (pathnameChange) {
      return setFavRecipesStorage(favFoods);
    }
    return setDoneRecipes(donFoods);
  };

  const filterAll = (evt) => {
    evt.preventDefault();
    if (pathnameChange) {
      setFavRecipesStorage(recipesFromStorage);
    }
    return setDoneRecipes(doneFromStorage);
  };

  return (
    <div>
      <Header>{ header }</Header>
      <ButtonByCategory
        filterAll={ filterAll }
        filterFoods={ filterFoods }
        filterDrinks={ filterDrinks }
      />

      {(pathname.includes('receitas-feitas'))
        ? <DoneRecipeCard doneRecipes={ doneRecipes } />
        : <FavoritesCard recipes={ favRecStorage } setStorage={ setFavRecipesStorage } />}

    </div>
  );
}

ListOfRecipes.propTypes = {
  header: PropTypes.string,
}.isRequired;

export default ListOfRecipes;
