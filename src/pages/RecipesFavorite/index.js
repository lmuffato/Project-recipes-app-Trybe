import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import './index.css';
import Header from '../../components/header';

export default function RecipesFavorites() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const [filterRecipes, setFilterRecipes] = useState(favoriteRecipes);
  const [clipBoardFood, setClipBoardFood] = useState(false);
  const [clipBoardDrink, setClipBoardDrink] = useState(false);

  function buttonsFilters(param) {
    if (param === 'all') {
      setFilterRecipes(favoriteRecipes
         && favoriteRecipes.filter(({ type }) => type));
    }
    if (param === 'food') {
      setFilterRecipes(favoriteRecipes
        && favoriteRecipes.filter(({ type }) => type === 'comida'));
    } if (param === 'drinks') {
      setFilterRecipes(favoriteRecipes
        && favoriteRecipes.filter(({ type }) => type === 'bebida'));
    }
  }

  function clipBoard(type, id) {
    copy(`http://localhost:3000/${type}s/${id}`);
    if (type === 'comida') {
      setClipBoardFood(true);
    } if (type === 'bebida') {
      setClipBoardDrink(true);
    }
  }

  function removeFavorite(target, idItem) {
    const item = target.parentNode.parentNode.parentNode;
    item.remove();
    const obj = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newObj = obj.filter(({ id }) => id !== idItem);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newObj));
  }

  return (
    <>

      <Header title="Receitas Favoritas" isSearch={ false } />
      <nav className="filter-buttons">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => buttonsFilters('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => buttonsFilters('food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => buttonsFilters('drinks') }
        >
          Drinks
        </button>
      </nav>
      {filterRecipes && filterRecipes
        .map(
          ({ id, image, category, name, type,
            area, alcoholicOrNot }, index) => (
            type === 'comida'
              ? (
                <div
                  key={ id }
                >
                  <Link to={ `/${type}s/${id}` }>
                    <img
                      className="images"
                      src={ image }
                      alt="imagem-receive"
                      data-testid={ `${index}-horizontal-image` }
                    />
                    <p
                      className="recipe-name"
                      data-testid={ `${index}-horizontal-name` }
                    >
                      {name}

                    </p>
                  </Link>
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {`${area} - ${category}`}
                  </p>
                  <div className="buttons-share-favorite">
                    <button type="button" onClick={ () => clipBoard(type, id) }>
                      <img
                        data-testid={ `${index}-horizontal-share-btn` }
                        src={ shareIcon }
                        alt="share button"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={ ({ target }) => removeFavorite(target, id) }
                    >
                      <img
                        data-testid={ `${index}-horizontal-favorite-btn` }
                        src={ blackHeartIcon }
                        alt="favorite button"
                      />
                    </button>
                    <spam>{clipBoardFood === true ? 'Link copiado!' : null}</spam>
                  </div>
                </div>)
              : (
                <div key={ id }>
                  <Link to={ `/${type}s/${id}` }>
                    <img
                      className="images"
                      src={ image }
                      alt="imagem-receive"
                      data-testid={ `${index}-horizontal-image` }
                    />
                    <p data-testid={ `${index}-horizontal-name` }>{name}</p>
                  </Link>
                  <p data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</p>
                  <button type="button" onClick={ () => clipBoard(type, id) }>
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="share button"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={ ({ target }) => removeFavorite(target, id) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      src={ blackHeartIcon }
                      alt="favorite button"
                    />
                  </button>
                  <spam>{clipBoardDrink === true ? 'Link copiado!' : null}</spam>
                </div>)
          ),
        )}
    </>
  );
}
