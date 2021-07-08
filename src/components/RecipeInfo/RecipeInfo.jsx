import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import shareIconImg from '../../images/shareIcon.svg';
import favoriteIconImg from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import useDetailsProvider from '../../hooks/useDetailsProvider';
import handleSetFavoritesToLocalStorage from '../../helpers/localStorageHelper';

const THREE_SECONDS = 3000;
function RecipeInfo(props) {
  const { recipeName, recipeThumb,
    type, recipe,
    children,
  } = props;
  const history = useHistory();
  const recipeURL = history.location.pathname;
  const [copyToClipboard, setCopyToClipboard] = useState(false);
  const { isFavorite, setIsFavorite } = useDetailsProvider();
  const [, setFavoriteRecipes] = useState([]);
  const recipeId = type === 'meals' ? recipe.idMeal : recipe.idDrink;
  const recipeType = type === 'meals' ? 'comida' : 'bebida';

  useEffect(() => {
    const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteStorage) setFavoriteRecipes(favoriteStorage);
  }, []);

  useEffect(() => {
    const recipeObj = {
      id: recipeId,
      type: recipeType,
      area: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipeName,
      image: recipeThumb,
    };
    if (isFavorite) {
      // const updatedRecipes = favoriteRecipes.filter((it) => it !== recipeId);
      // localStorage.setItem('favoriteRecipes', JSON.stringify(updatedRecipes));
      handleSetFavoritesToLocalStorage(recipeObj);
    }
  }, [
    isFavorite, recipe.strAlcoholic,
    recipe.strArea, recipe.strCategory, recipeId, recipeName, recipeThumb, recipeType]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(`http://localhost:3000${recipeURL}`);
    setCopyToClipboard(true);
    setTimeout(() => {
      setCopyToClipboard(false);
    }, THREE_SECONDS);
  };

  const handleFavoriteRecipe = () => {
    setIsFavorite((previousState) => !previousState);
  };

  return (
    <div className="componente1">
      <div className="img-container">
        <img src={ recipeThumb } alt="Foto da receita" data-testid="recipe-photo" />
      </div>
      <div className="recipe-info">
        <h2 data-testid="recipe-title">{ recipeName }</h2>
        <div className="icons">
          { copyToClipboard ? <span>Link copiado!</span> : '' }
          <input
            type="image"
            src={ shareIconImg }
            alt="ícone de compartilhar"
            data-testid="share-btn"
            onClick={ handleCopyToClipboard }
          />
          <input
            type="image"
            src={ isFavorite ? blackHeartIcon : favoriteIconImg }
            alt="ícone de favoritar"
            data-testid="favorite-btn"
            onClick={ handleFavoriteRecipe }
          />

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

// Lógica de copiar para o clipboard pesquisada no StackOverflow
// Link: https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
// https://dev.to/myogeshchavan97/an-easy-way-for-adding-copy-to-clipboard-functionality-in-react-app-4oo0
