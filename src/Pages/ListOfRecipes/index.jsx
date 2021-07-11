import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../../Components/Header';
import ButtonByCategory from '../../Components/ButtonByCategory';
import FavoritesCard from '../../Components/FavoritesCard';

function ListOfRecipes({ header }) {
  const recipesFromStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [favRecipesStorage, setFavRecipesStorage] = useState(recipesFromStorage);

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
      <FavoritesCard
        recipeArray={ favRecipesStorage }
        setFavRecipesStorage={ setFavRecipesStorage }
      />
    </div>
  );
}

ListOfRecipes.propTypes = {
  header: PropTypes.string,
}.isRequired;

export default ListOfRecipes;
