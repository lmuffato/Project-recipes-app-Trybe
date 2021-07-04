import React from 'react';
import './Styles.css';
import BlackHeart from '../../images/blackHeartIcon.svg';
import ShareIcon from '../../images/shareIcon.svg';
import Header from './Header';
import ColoredLine from './ColoredLine';

function TelaReceitaEmProgresso() {
  return (
    <div className="backGround">
      <Header />
      <div>
        <img id="food-picture" src="https://publisher-publish.s3.eu-central-1.amazonaws.com/pb-brasil247/swp/jtjeq9/media/20190703150712_3a5cce71-4170-463c-a9ca-ce55953a8533.webp" alt="foodPicture" />
      </div>
      <div className="like-share-container">
        <button type="button">
          <img src={ BlackHeart } alt="black heart icon" data-testid="favorite-btn" />
        </button>
        <button type="button" data-testid="share-btn">
          <img src={ ShareIcon } alt="share icon" />
        </button>
      </div>
      <div id="title-container" data-testid="recipe-title">
        Chelsea Buns
        <ColoredLine color="#EE9EE1" />
        Dessert
      </div>
      <div id="ingredients">
        Ingredients
        <input type="checkbox" name="ingrediente" data-testid="ingredient-step" />
        Item 1
        <input type="checkbox" name="ingrediente" data-testid="ingredient-step" />
        Item 1
        <input type="checkbox" name="ingrediente" data-testid="ingredient-step" />
        Item 1
        <input type="checkbox" name="ingrediente" data-testid="ingredient-step" />
        Item 1
        <input type="checkbox" name="ingrediente" data-testid="ingredient-step" />
        Item 1
        <input type="checkbox" name="ingrediente" data-testid="ingredient-step" />
        Item 1
        <button type="button" id="botao-finalizarReceita" data-testid="finish-recipe-btn">
          Finalizar Receita
        </button>
      </div>
      <div id="instructions" data-testid="instructions">
        Instructions
        <div data-testid="recipe-category">
          oosdha osidasoid aosid aosidhaso idhasoid asodhas
          oosdha osidasoid aosid aosidhaso idhasoid asodhas
          oosdha osidasoid aosid aosidhaso idhasoid asodhas
          oosdha osidasoid aosid aosidhaso idhasoid asodhas
          oosdha osidasoid aosid aosidhaso idhasoid asodhas
        </div>
      </div>
      <div id="video">
        Vídeo
        <iframe title="https://youtu.be/mhDJNfV7hjk" />
      </div>
      <div id="recomendedId-container">
        Recomendadas
        <div id="recomended-container">
          <div>
            <div className="recomended" data-testid="recipe-photo" />
            <div className="recomended-name">Bible Belt</div>
          </div>
          <div>
            <div className="recomended" data-testid="recipe-photo" />
            <div className="recomended-name">Bible Belt</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TelaReceitaEmProgresso;
