import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function ReceitasFavoritas() {
  const favoritesStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || {};
  const [favData, setFavData] = useState(favoritesStorage);
  // const { favoriteStorage, setFavoriteStorage } = useState(false);
  const [mimeButton, setMimeButton] = useState(false);

  const handleClick = ({ target }) => {
    const { alt } = target;
    setMimeButton(true);
    const path = `http://localhost:3000${alt}`;
    navigator.clipboard.writeText(path);
  };

  const localStorageRetriever = ({ target }) => {
    const { alt } = target;
    const local = localStorage.getItem('favoriteRecipes');
    const favs = JSON.parse(local);
    const toRemove = favs.find((e) => (e.id === alt));
    const removed = favs.filter((e) => e !== toRemove);
    setFavData(localStorage.setItem('favoriteRecipes', JSON.stringify(removed)));
  };

  /* Source: https://github.com/tryber/sd-09-project-recipes-app/tree/524b096830480588272f95f19414d77636fb705f */
  const isFood = ({ id, image, type, name, category, area, alcoholicOrNot }, index) => {
    if (type === 'comida') {
      return (
        <div key={ id }>
          { mimeButton ? <span>Link copiado!</span> : null }

          <span data-testid={ `${index}-horizontal-top-text` }>
            { `${area} - ${category}` }
          </span>

          <img
            src={ image }
            alt="comida"
            data-testid={ `${index}-horizontal-image` }
          />

          <span data-testid={ `${index}-horizontal-name` }>
            { name }
          </span>

          <button type="button" onClick={ handleClick }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt={ `/${type}s/${id}` }
            />
          </button>

          <button type="button" onClick={ localStorageRetriever } key={ id }>
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt={ id }
            />
          </button>

        </div>
      );
    }
    return (
      <div key={ type }>
        <button type="button" onClick={ handleClick }>
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt={ `${type}s/${id}` }
          />
        </button>

        <button type="button" onClick={ localStorageRetriever } key={ id }>
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            alt={ id }
          />
        </button>

        { mimeButton ? <span>Link copiado!</span> : null }

        <img src={ image } alt="bebida" data-testid={ `${index}-horizontal-image` } />

        <span data-testid={ `${index}-horizontal-top-text` }>
          { alcoholicOrNot }
        </span>

        <span data-testid={ `${index}-horizontal-name` }>
          { name }
        </span>
      </div>
    );
  };

  const renderFavData = () => {
    const data = favData || JSON.parse(localStorage.getItem('favoriteRecipes'));
    return data.map(
      ({ id, image, type, name, category, area, alcoholicOrNot }, index) => (
        isFood({ id, image, type, name, category, area, alcoholicOrNot }, index)
      ),
    );
  };

  useEffect(() => {
    renderFavData();
  });

  return (
    <div className="favorite_recipes">
      <Header title="Receitas Favoritas" />
      <div className="buttons">
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>

      {renderFavData()}
    </div>
  );
}

export default ReceitasFavoritas;
