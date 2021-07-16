import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import FavoriteBtn from '../compenents/FavoriteBtn';
import RecipesContext from '../contexts/RecipesContext';
import SearchbarContext from '../contexts/SearchbarContext';
import Header from '../compenents/Header';

function FavoriteRecipes() {
  const { favoriteRecipes, showRecipes, setShowRecipes } = useContext(RecipesContext);
  const { setHideSearchBtn, setPageName } = useContext(SearchbarContext);
  const [isCopy, setIsCopy] = useState(false);

  setPageName('Receitas Favoritas');

  useEffect(() => {
    setHideSearchBtn(false);
    setPageName('Receitas Favoritas');
  }, []);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (recipes === null) {
      global.alert('Nenhuma receita favorita encontrada!');
    } else {
      setShowRecipes(recipes);
    }
  }, [favoriteRecipes]);

  const copyToClipboard = ({ target }) => {
    const { alt } = target;
    const path = `http://localhost:3000/${alt}`;
    navigator.clipboard.writeText(path);
    setIsCopy(true);
  };

  const renderCards = (
    { id, type, area, category, alcoholicOrNot, name, image }, index,
  ) => {
    if (type === 'comida') {
      return (
        <div key={ id }>
          { isCopy ? <span>Link copiado!</span> : null }
          <Link to={ `/comidas/${id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ image }
              alt={ `${name} recipe` }
              width="150px"
            />
          </Link>

          <span data-testid={ `${index}-horizontal-top-text` }>
            { `${area} - ${category}` }
          </span>

          <Link to={ `/comidas/${id}` }>
            <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
          </Link>

          <button type="button" onClick={ copyToClipboard }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt={ `comidas/${id}` }
            />
          </button>

          <FavoriteBtn
            id={ id }
            index={ index }
          />
        </div>
      );
    }
    return (
      <div key={ id }>
        { isCopy ? <span>Link copiado!</span> : null }
        <Link to={ `/bebidas/${id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt={ `${name} recipe` }
            width="150px"
          />
        </Link>

        <span data-testid={ `${index}-horizontal-top-text` }>
          { alcoholicOrNot }
        </span>

        <Link to={ `/bebidas/${id}` }>
          <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
        </Link>

        <button type="button" onClick={ copyToClipboard }>
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt={ `bebidas/${id}` }
          />
        </button>

        <FavoriteBtn
          id={ id }
          index={ index }
        />
      </div>
    );
  };

  const handleContent = (param) => {
    if (param === 'all') {
      setShowRecipes(favoriteRecipes);
    } else if (param === 'meals') {
      const mealsRecipes = favoriteRecipes.filter((recipe) => recipe.type === 'comida');
      setShowRecipes(mealsRecipes);
    } else if (param === 'cocktails') {
      const drinksRecipes = favoriteRecipes
        .filter((recipe) => recipe.type === 'bebida');
      setShowRecipes(drinksRecipes);
    }
  };

  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => handleContent('all') }
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => handleContent('meals') }
      >
        Food
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => handleContent('cocktails') }
      >
        Drinks
      </button>

      {
        showRecipes.map(
          ({ id, type, area, category, alcoholicOrNot, name, image }, index) => (
            renderCards({ id, type, area, category, alcoholicOrNot, name, image }, index)
          ),
        )
      }
    </div>
  );
}

export default FavoriteRecipes;
