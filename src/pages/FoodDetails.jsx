import React from 'react';

export default function FoodDetails() {
  return (
    <section>
      <img data-testid="recipe-photo" src="#" alt="#" />
      <h1 data-testid="recipe-title">Recipe Title</h1>
      <button type="button" data-testid="share-btn">Share button</button>
      <button type="button" data-testid="favorite-btn">Favorite button</button>

      <textarea data-testid="recipe-category" />
      <textarea data-testid="index-ingredient-name-and-measure" />
      <textarea data-testid="instructions" />
      <iframe
        data-testid="video"
        width="278"
        height="200"
        src="https://www.youtube.com/embed/YX0y1FMlb8I"
        title="YouTube video player"
      />
      <div data-testid="index-recomendation-card" />
      <button type="button" data-testid="start-recipe-btn">Start Recipe</button>
    </section>
  );
}

// A foto deve possuir o atributo data-testid="recipe-photo";
// O título deve possuir o atributo data-testid="recipe-title";
// O botão de compartilhar deve possuir o atributo data-testid="share-btn";
// O botão de favoritar deve possuir o atributo data-testid="favorite-btn";

// O texto da categoria deve possuir o atributo data-testid="recipe-category";
// Os ingredientes devem possuir o atributo data-testid="${index}-ingredient-name-and-measure";
// O texto de instruções deve possuir o atributo data-testid="instructions";
// O vídeo, presente somente na tela de comidas, deve possuir o atributo data-testid="video";
// O card de receitas recomendadas deve possuir o atributo data-testid="${index}-recomendation-card";
// O botão de iniciar receita deve possuir o atributo data-testid="start-recipe-btn"


// carousel: https://react-bootstrap.github.io/components/carousel/