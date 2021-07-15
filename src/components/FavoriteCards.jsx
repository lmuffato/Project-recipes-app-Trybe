import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FavoritesContext from '../context/FavoritesContext';
import FavoriteCardMeal from './FavoriteCardMeal';
import FavoriteCardDrink from './FavoriteCardDrink';

export default function FavoriteCards() {
  const { allFavorites,
    renderMeals,
    renderDrinks } = useContext(FavoritesContext);

  const filterAllFavorites = () => {
    if (renderMeals) {
      return allFavorites.filter((item) => Object.keys(item).includes('idMeal'));
    }
    if (renderDrinks) {
      return allFavorites.filter((item) => Object.keys(item).includes('idDrink'));
    }
    return allFavorites;
  };

  const checkType = (item, index) => {
    const keys = Object.keys(item);
    const isFood = keys.find((key) => key === 'idMeal');

    return isFood ? (
      <FavoriteCardMeal item={ item } index={ index } key={ index } />
    ) : (
      <FavoriteCardDrink item={ item } index={ index } key={ index } />
    );
  };

  return allFavorites && (
    <div className="cardsDoneRecipes">
      { filterAllFavorites().map((item, index) => checkType(item, index)) }
    </div>
  );
}

FavoriteCards.propTypes = {
  item: PropTypes.obj,
  index: PropTypes.index,
}.isRequired;
