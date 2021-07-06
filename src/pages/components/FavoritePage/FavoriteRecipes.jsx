import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import favorite from '../../../services/mockFavorite';
import shareIcon from '../../../images/shareIcon.svg';
import unFavoriteIcon from '../../../images/blackHeartIcon.svg';

export default function FavoriteRecipes(props) {
  const [favoriteList, setFavoriteList] = useState('');
  const { filter } = props;
  useEffect(() => {
    // localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
    setFavoriteList(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  // const favorites = JSON.parse(localStorage.getItem('favorite'));
  // useEffect(() => {}, [favoriteList]);

  const unFavorite = (e) => {
    const { name } = e.target.parentNode;
    console.log(name);
    const oldFavoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorite = oldFavoriteList
      .filter((favoriteRecipe) => favoriteRecipe.name !== name);
    setFavoriteList(newFavorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
  };

  function filteredFood(recipe, index) {
    if (recipe.type === 'meal') {
      return (
        <div key={ recipe.name }>
          <Link to={ `/comidas/${recipe.id}` }>
            <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <h3
            data-testid={ `${index}-horizontal-top-text` }
          >
            { recipe.category }
          </h3>
          <h3>{ recipe.area }</h3>
          {/* https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
            Site em que aprendi a copiar para o clipboard
          */}
          <button
            type="button"
            onClick={ () => {
              navigator.clipboard
                .writeText(`http://localhost:3000/comidas/${recipe.id}`);
            } }
            data-testid={ `${index}-horizontal-share-btn` }
          >
            <img src={ shareIcon } alt="share" />
          </button>
          <button
            name={ recipe.name }
            type="button"
            onClick={ unFavorite }
            data-testid={ `${index}-horizontal-favorite-btn` }
          >
            <img src={ unFavoriteIcon } alt="unfavorite" />
          </button>
        </div>
      );
    }
  }

  function filteredDrink(recipe, index) {
    if (recipe.type === 'drink') {
      console.log('a');
      return (
        <div key={ recipe.name }>
          <Link to={ `/comidas/${recipe.id}` }>
            <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <h3>{ recipe.alcoholicOrNot }</h3>
          {/* https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
            Site em que aprendi a copiar para o clipboard
          */}
          <button
            type="button"
            onClick={ () => {
              navigator.clipboard
                .writeText(`http://localhost:3000/bebidas/${recipe.id}`);
            } }
            data-testid={ `${index}-horizontal-share-btn` }
          >
            <img src={ shareIcon } alt="share" />
          </button>
          <button
            name={ recipe.name }
            type="button"
            onClick={ unFavorite }
            data-testid={ `${index}-horizontal-favorite-btn` }
          >
            <img src={ unFavoriteIcon } alt="unfavorite" />
          </button>
        </div>
      );
    }
  }
  const filterFavorite = () => (
    favoriteList.map((recipe, index) => {
      let filtered = '';
      if ((filter === 'All' || filter === 'Food')
        && recipe.type === 'meal' && !recipe.doneDate) {
        filtered = filteredFood(recipe, index);
      } if ((filter === 'All' || filter === 'Drink')
        && recipe.type === 'drink' && !recipe.doneDate) {
        filtered = filteredDrink(recipe, index);
      }
      return filtered;
    })
  );

  return (
    <div>
      {favoriteList ? filterFavorite() : ''}
    </div>
  );
}
FavoriteRecipes.propTypes = {
  filter: PropTypes.string.isRequired,
};
