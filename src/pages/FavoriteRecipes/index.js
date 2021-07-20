import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

import './style.css';

/**
 * Consultei o repositório do Grupo 23 da turma 09 para fazer essa classe.
 * Link do repositório: https://github.com/tryber/sd-09-project-recipes-app/tree/main-group-23
 */
const FavoriteRecipes = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [reload, setReaload] = useState(false);
  const [shareButton, setShareButton] = useState(false);

  const loadStorage = () => {
    const list = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (list) {
      JSON.parse(localStorage.getItem('favoriteRecipes'));
    } else {
      return [];
    }
    setFavoriteList(list);
    setFilterList(list);
  };

  // Source: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
  const handleShare = ({ target: { alt } }) => {
    setShareButton(true);
    const url = `http://localhost:3000${alt}`;
    navigator.clipboard.writeText(url);
  };

  const handleFavorite = ({ target: { alt } }) => {
    const newList = favoriteList.filter((item) => item.id !== alt);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
    setFavoriteList(newList);
    setReaload(!reload);
  };

  const handleClick = ({ target: { innerText } }) => {
    if (innerText === 'All') {
      setFilterList(favoriteList);
    }

    if (innerText === 'Food') {
      setFilterList(favoriteList.filter(
        (item) => item.type === 'comida',
      ));
    }

    if (innerText === 'Drinks') {
      setFilterList(favoriteList.filter(
        (item) => item.type === 'bebida',
      ));
    }
  };

  useEffect(() => {
    loadStorage();
  }, [reload]);

  /* Source: https://github.com/tryber/sd-09-project-recipes-app/tree/main-group-23 */
  const isFood = ({ id, image, type, name, category, area, alcoholicOrNot }, index) => {
    if (type === 'comida') {
      return (
        <div key={ index } className="favorite-recipe-card">
          <Link to={ `/comidas/${id}` }>
            <img
              src={ image }
              alt="comida"
              data-testid={ `${index}-horizontal-image` }
              className="favorite-recipe-img"
            />
          </Link>

          <div className="itens-favorite-recipe-card">
            <p data-testid={ `${index}-horizontal-top-text` }>
              { `${area} - ${category}` }
            </p>
            <Link to={ `/comidas/${id}` }>
              <p data-testid={ `${index}-horizontal-name` }>
                { name }
              </p>
            </Link>

            <div className="container-buttons">
              <button type="button" onClick={ handleShare }>
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt={ `/${type}s/${id}` }
                />
              </button>

              <button type="button" onClick={ handleFavorite }>
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt={ id }
                />
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={ index } className="favorite-recipe-card">
        <Link to={ `/bebidas/${id}` }>
          <img
            src={ image }
            alt="bebida"
            data-testid={ `${index}-horizontal-image` }
            className="favorite-recipe-img"
          />
        </Link>

        <div className="itens-favorite-recipe-card">
          <p data-testid={ `${index}-horizontal-top-text` }>
            { alcoholicOrNot }
          </p>
          <Link to={ `/bebidas/${id}` }>
            <p data-testid={ `${index}-horizontal-name` }>
              { name }
            </p>
          </Link>

          <div className="buttons">
            <button type="button" onClick={ handleShare }>
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt={ `${type}s/${id}` }
              />
            </button>

            <button type="button" onClick={ handleFavorite }>
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt={ id }
              />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <div className="buttons">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleClick }
          className="button-favorite"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleClick }
          className="button-favorite"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleClick }
          className="button-favorite"
        >
          Drinks
        </button>
      </div>

      { shareButton ? <span>Link copiado!</span> : null }

      {filterList.map(
        ({ id, image, type, name, category, area, alcoholicOrNot }, index) => (
          isFood({ id, image, type, name, category, area, alcoholicOrNot }, index)
        ),
      )}
    </div>
  );
};

export default FavoriteRecipes;
