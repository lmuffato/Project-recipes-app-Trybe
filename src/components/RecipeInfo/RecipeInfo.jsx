import React, { useState } from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import shareIconImg from '../../images/shareIcon.svg';
import favoriteIconImg from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import Button from '../Generics/Button';

function RecipeInfo(props) {
  const { recipeName, recipeThumb, children, type, recipe } = props;
  const [copyToClipboard, setCopyToClipboard] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const recipeId = type === 'meals' ? recipe.idMeal : recipe.idDrink;
  const detailsUrl = type === 'meals' ? `/comidas/${recipe.idMeal}`
    : `/bebidas/${recipe.idDrink}`;

  const currentDate = format(new Date(), 'EEEEEE, d MMMM YYY', {
    locale: ptBR,
  });

  function handleCopyToClipboard(ev) {
    // Lógica de copiar para o clipboard pesquisada no StackOverflow
    // Link: https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
    ev.preventDefault();
    navigator.clipboard.writeText(`http://localhost:3000${detailsUrl}`);
    setCopyToClipboard(true);
  }

  const handleFavoriteRecipe = (ev) => {
    ev.preventDefault();
    const favoriteRecipesArr = [];
    const recipeObj = {
      id: recipeId,
      type,
      area: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipeName,
      image: recipeThumb,
      doneDate: currentDate,
      tags: recipe.strTags,
    };
    const getFavoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getFavoriteRecipe) {
      const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const setToFavoriteRecipes = [...getFavorites, recipeObj];
      localStorage.setItem('favoriteRecipes', JSON.stringify(setToFavoriteRecipes));
    } else {
      const newFavoriteRecipes = [...favoriteRecipesArr, recipeObj];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    }
    setIsFavorite((previousState) => !previousState);
  };

  return (
    <div className="componente1">
      <div className="img-container">
        <img src={ recipeThumb } alt="Foto da receita" data-testid="recipe-photo" />
      </div>
      <div className="recipe-info">
        { copyToClipboard && 'Link copiado!' }
        <h2 data-testid="recipe-title">{ recipeName }</h2>
        <div className="icons">
          <Button className="icon-btn" onClick={ (ev) => handleCopyToClipboard(ev) }>
            <img
              src={ shareIconImg }
              alt="ícone de compartilhar"
              data-testid="share-btn"
            />
          </Button>
          <Button className="icon-btn" onClick={ (ev) => handleFavoriteRecipe(ev) }>
            <img
              src={ isFavorite ? blackHeartIcon : favoriteIconImg }
              alt="ícone de favoritar"
              data-testid="favorite-btn"
            />
          </Button>
        </div>
      </div>
      <div>{ children }</div>
    </div>
  );
}

export default RecipeInfo;

RecipeInfo.defaultProps = {
  recipe: {},
};

RecipeInfo.propTypes = {
  recipeName: PropTypes.string.isRequired,
  recipeThumb: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  recipe: PropTypes.shape(),
};
