import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIconImg from '../../images/shareIcon.svg';
import favoriteIconImg from '../../images/whiteHeartIcon.svg';
import Button from '../Generics/Button';

function RecipeInfo(props) {
  const { recipeName, recipeThumb, children, type, recipe } = props;
  const [copyToClipboard, setCopyToClipboard] = useState(false);
  const detailsUrl = type === 'comida' ? `/comidas/${recipe.idMeal}`
    : `/bebidas/${recipe.idDrink}`;

  function handleCopyToClipboard(ev) {
    // Lógica de copiar para o clipboard pesquisada no StackOverflow
    // Link: https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
    ev.preventDefault();
    navigator.clipboard.writeText(`http://localhost:3000${detailsUrl}`);
    setCopyToClipboard(true);
  }

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
          <Button className="icon-btn">
            <img
              src={ favoriteIconImg }
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

RecipeInfo.propTypes = {
  recipeName: PropTypes.string.isRequired,
  recipeThumb: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  recipe: PropTypes.shape(PropTypes.object).isRequired,
};
