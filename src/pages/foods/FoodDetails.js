import React from 'react';
import PropTypes from 'prop-types';

function FoodDetails(props) {
  const { match: { params: { id } } } = props;
  return (
    <div>
      Comida
      { id }
      <div className="teste-details">
        <img src="" alt="" data-testid="recipe-photo" />
        <h1 data-testid="recipe-title">título</h1>
        <button type="button" data-testid="share-btn">compartilhar</button>
        <button type="button" data-testid="favorite-btn">favoritar</button>
        <p data-testid="recipe-category">categoria</p>
        <li data-testid="0-ingredient-name-and-measure">um</li>
        <p data-testid="instructions">texto</p>
        <div data-testid="video">vídeo</div>
        <div data-testid="0-recomendation-card">recomendação</div>
        <button type="button" data-testid="start-recipe-btn">Iniciar</button>
      </div>
    </div>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default FoodDetails;

/* const urlRecipie = verifyPath
      ? 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
      : 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
    const fecthMeal = await fetch(`${urlRecipie}${element}`);
    const resultMeal = await fecthMeal.json();
    setStateRedux({ actionType: 'FETCH_RECIPIE', resultMeal }); */
