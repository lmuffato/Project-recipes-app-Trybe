import React from 'react';
import '../styles/doneRecipes.css';

function DoneRecipeCard() {
  return (
    <div className="done-recipe-cards">
      <div className="done-recipe-cards-image">
        <p>Imagem</p>
      </div>
      <div className="done-recipe-cards-infos">
        <h1>Receita teste Card</h1>
        <p>data do preparo</p>
      </div>
    </div>
  );
}

export default DoneRecipeCard;
