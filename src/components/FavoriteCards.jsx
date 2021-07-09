import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FavoritesContext from '../context/FavoritesContext';
import FavoriteCardMeal from './FavoriteCardMeal';
import FavoriteCardDrink from './FavoriteCardDrink';

export default function FavoriteCards() {
  const { allFavorites } = useContext(FavoritesContext);

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
    <div>
      { allFavorites.map((item, index) => checkType(item, index)) }
    </div>
  );
}

FavoriteCards.propTypes = {
  item: PropTypes.obj,
  index: PropTypes.index,
}.isRequired;
