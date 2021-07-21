import React, { useContext, useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import useLocalStorage from '../hooks/useLocalStorage';
import RecipesContext from '../contexts/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Copied from '../components/Copied';

import '../styles/FavoriteRecipes.css';

function FavoriteRecipes() {
  const { favoriteRecipes } = useContext(RecipesContext);
  const [hasCopied, setHasCopied] = useState(false);
  const { updateFavoriteRecipes } = useLocalStorage();
  const [filter, setFilter] = useState('All');
  const [displayedRecipes, setDisplayedRecipes] = useState(favoriteRecipes);

  const handleCopyClick = (recipeType, recipeId) => {
    copy(`http://localhost:3000/${recipeType}/${recipeId}`);

    setHasCopied(true);
    const messageTimer = 3000;
    setTimeout(() => {
      setHasCopied(false);
    }, messageTimer);
  };

  const handleFilterClick = ({ target }) => {
    setFilter(target.innerHTML);
  };

  useEffect(() => {
    switch (filter) {
    case 'All':
      setDisplayedRecipes(favoriteRecipes);
      break;
    case 'Food':
      setDisplayedRecipes(favoriteRecipes.filter(({ type }) => type === 'comida'));
      break;
    case 'Drinks':
      setDisplayedRecipes(favoriteRecipes.filter(({ type }) => type === 'bebida'));
      break;
    default:
      break;
    }
  }, [filter, favoriteRecipes]);

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <main>
        <ul className="filters">
          <li>
            <button
              type="button"
              data-testid="filter-by-all-btn"
              onClick={ handleFilterClick }
            >
              All
            </button>
          </li>
          <li>
            <button
              type="button"
              data-testid="filter-by-food-btn"
              onClick={ handleFilterClick }
            >
              Food
            </button>
          </li>
          <li>
            <button
              type="button"
              data-testid="filter-by-drink-btn"
              onClick={ handleFilterClick }
            >
              Drinks
            </button>
          </li>
        </ul>

        <ul className="favorites-container">
          {displayedRecipes.map((recipe, index) => (
            <li key={ recipe.id }>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>

                <img
                  width="200"
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                  className="recipe-thumb"
                />
              </Link>

              <div className="recipe-info">
                <div>
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {recipe.area && `${recipe.area} - `}
                    {recipe.alcoholicOrNot || recipe.category}
                  </p>
                  <Link to={ `/${recipe.type}s/${recipe.id}` }>
                    <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
                  </Link>
                </div>

                <div className="icons-btn">
                  <button
                    type="button"
                    onClick={ () => handleCopyClick(`${recipe.type}s`, recipe.id) }
                  >
                    <img
                      src={ shareIcon }
                      alt="Compartilhar"
                      data-testid={ `${index}-horizontal-share-btn` }
                    />

                  </button>

                  <button
                    type="button"
                    onClick={ () => updateFavoriteRecipes(recipe, null, true) }
                  >
                    <img
                      src={ blackHeartIcon }
                      alt="remover dos favoritos"
                      data-testid={ `${index}-horizontal-favorite-btn` }
                    />
                  </button>

                </div>
              </div>

            </li>
          ))}
        </ul>
      </main>
      {hasCopied && <Copied />}
    </div>
  );
}

export default FavoriteRecipes;
