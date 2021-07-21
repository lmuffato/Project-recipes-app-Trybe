import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MealsDoneCards from './MealsDoneCards';
import DrinksDoneCards from './DrinksDoneCards';
// import RecipeFilters from './RecipeFilters';

export default function RecipesDone(props) {
  const [favoriteList, setFavoriteList] = useState('');
  const [filteredList, setFilteredList] = useState('');
  const { filter } = props;
  useEffect(() => {
    setFavoriteList(JSON.parse(localStorage.getItem('doneRecipes')));
    setFilteredList(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  useEffect(() => {
    if (filter === 'All' && filteredList) {
      setFilteredList((favoriteList.filter((recipe) => recipe.doneDate)));
    } if (filter === 'comida' && filteredList) {
      setFilteredList(favoriteList
        .filter((recipe) => recipe.doneDate && recipe.type === 'comida'));
    } if (filter === 'bebida' && filteredList) {
      setFilteredList(favoriteList
        .filter((recipe) => recipe.doneDate && recipe.type === 'bebida'));
    }
  }, [filter]);// eslint-disable-line

  return (
    <div className="recipes-done-cards">
      {filteredList ? filteredList.map((recipe, index) => (
        <div key={ index }>
          {recipe.type === 'comida'
            ? <MealsDoneCards props={ { recipe, index } } />
            : <DrinksDoneCards props={ { recipe, index } } />}
        </div>
      )) : ''}
    </div>
  );
}
RecipesDone.propTypes = {
  filter: PropTypes.string.isRequired,
};
