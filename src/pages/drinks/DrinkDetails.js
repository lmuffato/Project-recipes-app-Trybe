import React from 'react';
import PropTypes from 'prop-types';

function DrinkDetails(props) {
  const { match: { params: { id } } } = props;
  return (
    <div>
      Bebida de ID :
      { id }
      <div className="teste-details">
        <img src="" alt="" data-testid="recipe-photo" />
        <h1 data-testid="recipe-title">título</h1>
        <button type="button" data-testid="share-btn">compartilhar</button>
        <button type="button" data-testid="favorite-btn">favoritar</button>
        <p data-testid="recipe-category">categoria</p>
        <li data-testid="0-ingredient-name-and-measure">um</li>
        <p data-testid="instructions">texto</p>
        <div data-testid="0-recomendation-card">recomendação</div>
        <button type="button" data-testid="start-recipe-btn">Iniciar</button>
      </div>
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default DrinkDetails;
