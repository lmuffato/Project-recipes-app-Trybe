import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function FavoriteCards() {
  const [copy, setCopy] = useState('');
  const [data, setData] = useState();
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  const removeFavorite = (recipe) => {
    const previousValue = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newValue = previousValue.filter((obj) => obj.id !== recipe.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newValue));
    setData(newValue);
  };

  const copyLink = (recipe) => {
    const url = `http://localhost:3000/${recipe.type}s/${recipe.id}`;
    navigator.clipboard.writeText(url);
    setCopy('Link copiado!');
  };

  const renderCards = () => {
    let result = '';

    if (data && data.length > 0) {
      if (filter === 'All') {
        result = data;
      }
      if (filter === 'Food') {
        result = data.filter((recipe) => recipe.type === 'comida');
      }
      if (filter === 'Drink') {
        result = data.filter((recipe) => recipe.type === 'bebida');
      }

      return (
        result.map((recipe, index) => {
          const { id, type, image, name, category, alcoholicOrNot, area } = recipe;
          const alcoholic = alcoholicOrNot !== '' ? alcoholicOrNot : category;
          const text = area !== '' ? `${area} - ${alcoholic}` : alcoholic;
          return (
            <div className="card" data-testid={ `${index}-recipe-card` } key={ name }>
              <Link to={ `/${type}s/${id}` } key={ name }>
                <img
                  alt="recipe"
                  data-testid={ `${index}-horizontal-image` }
                  className="recipe-card-image"
                  src={ image }
                />
              </Link>
              <div className="title-div">
                <Link to={ `/${type}s/${id}` } key={ name }>
                  <h1
                    data-testid={ `${index}-horizontal-name` }
                    className="title"
                  >
                    {name}
                  </h1>
                </Link>
                <h5 data-testid={ `${index}-horizontal-top-text` }>{text}</h5>
              </div>
              <div>
                <button type="button" onClick={ () => removeFavorite(recipe) }>
                  <img
                    alt="unfavorite"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                  />
                </button>
                <button
                  data-testid={ `${index}-horizontal-share-btn` }
                  type="button"
                  onClick={ () => copyLink(recipe) }
                  src={ shareIcon }
                >
                  <img alt="share" src={ shareIcon } />
                </button>
              </div>
            </div>
          );
        })
      );
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={ () => setFilter('All') }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        onClick={ () => setFilter('Food') }
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        onClick={ () => setFilter('Drink') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {copy}
      <div className="list">
        {renderCards()}
      </div>
    </div>
  );
}
