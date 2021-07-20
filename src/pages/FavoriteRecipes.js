import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../compenents/Header';
import shareIcon from '../images/shareIcon.svg';
import FavoriteBtn from '../compenents/FavoriteBtn';
import RecipesContext from '../contexts/RecipesContext';
import SearchbarContext from '../contexts/SearchbarContext';

function FavoriteRecipes() {
  const { favoriteRecipes, showRecipes, setShowRecipes } = useContext(RecipesContext);
  const { setPageName } = useContext(SearchbarContext);
  const [isCopy, setIsCopy] = useState(false);

  setPageName('Receitas Favoritas');

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
        <div key={ id } className="recipe-fav">
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
    <div className="main-recipes">
      <Header />
      <section className="button-container-fav">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          className="button-fav button-filter"
          onClick={ () => handleContent('all') }
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-food-btn"
          className="button-fav button-filter"
          onClick={ () => handleContent('meals') }
        >
          Food
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          className="button-fav button-filter"
          onClick={ () => handleContent('cocktails') }
        >
          Drinks
        </button>
      </section>

      <section className="recipes-container-fav">
        {
          showRecipes.map(
            ({ id, type, area, category, alcoholicOrNot, name, image }, index) => (
              renderCards({ id, type, area, category, alcoholicOrNot, name, image }, index)
            ),
          )
        }
      </section>
    </div>
  );
}

export default FavoriteRecipes;
