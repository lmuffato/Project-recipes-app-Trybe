import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import shareIconImg from '../../images/shareIcon.svg';
import favoriteIconImg from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import handleSetFavoritesToLocalStorage from '../../helpers/localStorageHelper';

const THREE_SECONDS = 3000;
function RecipeInfo(props) {
  const { recipeThumb,
    recipeName,
    type, recipe,
    recipeCategory,
  } = props;
  const { id } = useParams();
  const history = useHistory();
  const recipeURL = history.location.pathname;
  const [copyToClipboard, setCopyToClipboard] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const recipeId = type === 'meals' ? recipe.idMeal : recipe.idDrink;
  const recipeType = type === 'meals' ? 'comida' : 'bebida';

  const recipesObject = {
    id: recipeId,
    type: recipeType,
    area: recipe.strArea || '',
    category: recipe.strCategory || '',
    name: recipeName,
    image: recipeThumb,
    alcoholicOrNot: recipe.strAlcoholic || '',
  };

  useEffect(() => {
    let cancel = false;
    const handleCreateLocalStorageFavKey = () => {
      if (cancel) return;
      const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (getFavoriteRecipes && getFavoriteRecipes.some((item) => (
        item.id === id))) {
        setIsFavorite(true);
      } else if (!getFavoriteRecipes) {
        setIsFavorite(false);
        localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      }
    };
    handleCreateLocalStorageFavKey();
    return () => {
      cancel = true;
    };
  }, [id]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(`http://localhost:3000${recipeURL}`);
    setCopyToClipboard(true);
    setTimeout(() => {
      setCopyToClipboard(false);
    }, THREE_SECONDS);
  };

  const handleAddFavoriteRecipe = () => {
    setIsFavorite((prevState) => !prevState);
  };

  useEffect(() => {
    handleSetFavoritesToLocalStorage(recipesObject, isFavorite, 'favoriteRecipes', id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFavorite]);

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
            onClick={ handleAddFavoriteRecipe }
          />

        </div>
      </div>
      <div>
        <h3 data-testid="recipe-category">
          { recipeCategory }
        </h3>
      </div>
    </div>
  );
}

export default RecipeInfo;

RecipeInfo.defaultProps = {
  recipe: {},
  recipeName: '',
  recipeThumb: '',
};

RecipeInfo.propTypes = {
  recipeThumb: PropTypes.string,
  recipeName: PropTypes.string,
  recipeCategory: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  recipe: PropTypes.shape(),
};

// Lógica de copiar para o clipboard pesquisada no StackOverflow
// Link: https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
// https://dev.to/myogeshchavan97/an-easy-way-for-adding-copy-to-clipboard-functionality-in-react-app-4oo0
