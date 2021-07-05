import React from 'react';
import ShareIcon from '../../images/shareIcon.svg';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';
import RecomCard from './RecomCard';

export default function RecipeDetails(props) {
  console.log(props);
  return (
    <div>
      Recipe Details!!!
      <img src="" data-testid="recipe-photo" width="200px" alt="recipe details" />
      <h2 data-testid="recipe-title">Title</h2>
      <button type="button" onClick="">
        <img src={ ShareIcon } alt="share button" data-testid="share-btn" />
      </button>
      <button type="button" onClick="">
        <img src={ WhiteHeartIcon } alt="favorite button" data-testid="favorite-btn" />
      </button>
      <p data-testid="recipe-category">Category</p>
      <ul>
        <li data-testid="${index}-ingredient-name-and-measure">Ingredient</li>
      </ul>
      <h2 data-testid="instructions">Instructions</h2>
      <p>VÍDEO</p>
      <RecomCard data-testid="${index}-recomendation-card" />
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </div>
  );
}
