import React from 'react';
import shareIcon from '../images/shareIcon.svg';

class DetBebidas extends React.Component {
  render() {
    return (
      <>
        <img
          data-testid="recipe-photo"
          alt="imagem da receita"
        />
        <h1 data-testid="recipe-title">Título da receita</h1>
        <p data-testid="recipe-category">Categoria da Receita</p>
        <input
          type="image"
          data-testid="share-btn"
          src={ shareIcon }
          alt="Compartilhar receita"
        />
        <input
          type="image"
          data-testid="favorite-btn"
          alt="favoritar receita"
        />
        <ul>
          Lista de Ingredientes
          {/* <li data-testid={`${index}-ingredient-name-and-measure`}></li> */}
        </ul>
      </>
    );
  }
}

export default DetBebidas;
