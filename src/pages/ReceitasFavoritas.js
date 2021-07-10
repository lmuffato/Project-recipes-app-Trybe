import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/FavoriteCards.css';
import ShareBtn from '../components/RecipeComponents/ShareButton';

function ReceitasFavoritas() {
  const [favData, setFavData] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [doReload, setDoReload] = useState(false);

  const fetchStorage = () => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storage) {
      JSON.parse(localStorage.getItem('favoriteRecipes'));
    } else {
      return [];
    }
    setFavData(storage);
    setFilteredItems(storage);
  };

  const localStorageRetriever = ({ target }) => {
    const { alt } = target;
    const local = localStorage.getItem('favoriteRecipes');
    const favs = JSON.parse(local);
    const toRemove = favs.find((e) => (e.id === alt));
    const removed = favs.filter((e) => e !== toRemove);
    setFavData(localStorage.setItem('favoriteRecipes', JSON.stringify(removed)));
    setDoReload(!doReload);
  };

  /* Source: https://github.com/tryber/sd-09-project-recipes-app/tree/524b096830480588272f95f19414d77636fb705f */
  const isFood = ({ id, image, type, name, category, area, alcoholicOrNot }, index) => {
    if (type === 'comida') {
      return (
        <div key={ index }>
          <span data-testid={ `${index}-horizontal-top-text` }>
            { `${area} - ${category}` }
          </span>
          <Link to={ `/comidas/${id}` }>
            <img
              className="image"
              src={ image }
              alt="comida"
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <Link to={ `/comidas/${id}` }>
            <span data-testid={ `${index}-horizontal-name` }>
              { name }
            </span>
          </Link>
          <ShareBtn
            dataTest={ `${index}-horizontal-share-btn` }
            path={ `http://localhost:3000/${type}s/${id}` }
          />

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
      <div key={ index }>
        <ShareBtn
          dataTest={ `${index}-horizontal-share-btn` }
          path={ `http://localhost:3000/${type}s/${id}` }
        />

        <button type="button" onClick={ localStorageRetriever } key={ id }>
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            alt={ id }
          />
        </button>

        <Link to={ `/bebidas/${id}` }>
          <img
            className="image"
            src={ image }
            alt="bebida"
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
        <span data-testid={ `${index}-horizontal-top-text` }>
          { alcoholicOrNot }
        </span>
        <Link to={ `/bebidas/${id}` }>
          <span data-testid={ `${index}-horizontal-name` }>
            { name }
          </span>
        </Link>
      </div>
    );
  };

  const renderFavData = (filterType) => {
    if (filterType.includes('todos')) {
      setFilteredItems(favData);
    }
    if (filterType.includes('bebida')) {
      setFilteredItems(favData.filter((item) => item.type === 'bebida'));
    }
    if (filterType.includes('comida')) {
      setFilteredItems(favData.filter((item) => item.type === 'comida'));
    }
  };

  useEffect(() => {
    fetchStorage();
  }, [doReload]);

  return (
    <div className="favorite_recipes">
      <Header title="Receitas Favoritas" displayButton={ false } />
      <div className="buttons">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => renderFavData('todos') }
        >
          All

        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => renderFavData('comida') }
        >
          Food

        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => renderFavData('bebida') }
        >
          Drinks

        </button>
      </div>
      {filteredItems.map(
        ({ id, image, type, name, category, area, alcoholicOrNot }, index) => (
          isFood({ id, image, type, name, category, area, alcoholicOrNot }, index)
        ),
      )}
    </div>
  );
}

export default ReceitasFavoritas;
