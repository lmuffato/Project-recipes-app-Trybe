import React from 'react';
import './Styles.css';
import Header from './Header';
import FoodImage from './FoodImage';
import ColoredLine from './ColoredLine';
import LikeShareButton from './LikeShareButton';

function TelaReceitaEmProgresso() {
  return (
    <div className="backGround">
      <Header />
      <div>
        <FoodImage />
      </div>
      <LikeShareButton />
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
