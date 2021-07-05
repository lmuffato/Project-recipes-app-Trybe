import React from 'react';

export default function RecipesProgress() {
  return (
    <div className="recipes-progress">
      <img
        data-testid="recipe-photo"
        src="Imagem receita"
        alt="imagem da receita"
      />
      <div className="title">
        <h1 data-testid="recipe-title">Titulo Receita</h1>
        <button
          data-testid="share-btn"
          type="button"
        >
          compartilhar

        </button>
        <button
          data-testid="favorite-btn"
          type="button"
        >
          favoritar

        </button>
        <h2 data-testid="recipe-category">Categoria</h2>
        <h1>Ingredientes</h1>
        <div className="ingredients">
          <label htmlFor="ingredient">
            <input
              data-testid="{index}-ingredient-step"
              id="ingredient"
              type="checkbox"
            />
            ingrediente
          </label>
          <h1>Instruções</h1>
          <div data-testid="instructions">
            texto instruções
          </div>
          <button
            data-testid="finish-recipe-btn"
            type="button"
          >
            Finalizar Receita

          </button>
        </div>
      </div>

    </div>
  );
}
