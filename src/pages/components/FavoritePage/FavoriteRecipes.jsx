import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FavoriteMeals from './FavoriteMeals';
import FavoriteDrinks from './FavoriteDrinks';
import './cards.css';

export default function FavoriteRecipes(props) {
  const [favoriteList, setFavoriteList] = useState('');
  const [filteredList, setFilteredList] = useState('');
  const { filter } = props;
  useEffect(() => {
    setFavoriteList(JSON.parse(localStorage.getItem('favoriteRecipes')));
    const list = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (list) {
      setFilteredList((list.filter((recipe) => !recipe.doneDate)));
    }
  }, []);

  const unFavorite = (e) => {
    const recipeName = e.target.parentNode.name;
    const oldFavoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorite = oldFavoriteList
      .filter((favoriteRecipe) => favoriteRecipe.name !== recipeName);
    setFavoriteList(newFavorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
  };

  useEffect(() => {
    if (filter === 'All' && filteredList) {
      setFilteredList((favoriteList.filter((recipe) => !recipe.doneDate)));
    } else if (filter === 'comida' && filteredList) {
      setFilteredList(favoriteList
        .filter((recipe) => !recipe.doneDate && recipe.type === 'comida'));
    } else if (filter === 'bebida' && filteredList) {
      setFilteredList(favoriteList
        .filter((recipe) => !recipe.doneDate && recipe.type === 'bebida'));
    }
  }, [filter, favoriteList]); // eslint-disable-line

  return (
    <div className="card-list">
      {filteredList ? filteredList.map((recipe, index) => (
        <div key={ index }>
          {recipe.type === 'comida'
            ? <FavoriteMeals props={ { recipe, index, unFavorite } } />
            : <FavoriteDrinks props={ { recipe, index, unFavorite } } />}
        </div>
      )) : ''}
    </div>
  );
}

FavoriteRecipes.propTypes = {
  filter: PropTypes.string.isRequired,
};
