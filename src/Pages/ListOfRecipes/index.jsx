import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import Header from '../../Components/Header';
import ButtonByCategory from '../../Components/ButtonByCategory';
import FavoritesCard from '../../Components/FavoritesCard';
import UserContext from '../../context/UserContext';
import DoneRecipeCard from '../../Components/DoneRecipeCard';

function ListOfRecipes({ header }) {
  const recipesFromStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [favRecStorage, setFavRecipesStorage] = useState(recipesFromStorage);
  const { pathname } = useLocation();
  const { doneRecipes } = useContext(UserContext);

  const filterDrinks = (evt) => {
    evt.preventDefault();
    const drinks = recipesFromStorage.filter((recipe) => recipe.type === 'bebida');
    return setFavRecipesStorage(drinks);
  };
  const filterFoods = (evt) => {
    evt.preventDefault();
    const food = recipesFromStorage.filter((recipe) => recipe.type === 'comida');
    return setFavRecipesStorage(food);
  };

  const filterAll = (evt) => {
    evt.preventDefault();
    setFavRecipesStorage(recipesFromStorage);
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
