import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function IngredientsMeasure({ detailsRecepie }/* , setAllChecked */) {
  // const { idMeal } = detailsRecepie;

  const allIngredients = Object.entries(detailsRecepie)
    .filter((keys) => keys[0]
      .includes('strIngredient') && keys[1] !== null && keys[1] !== '');

  const allMeasure = Object.entries(detailsRecepie)
    .filter((keys) => keys[0]
      .includes('strMeasure') && keys[1] !== null && keys[1] !== '');

  /* salvar os ingredientes feitos, no local storage,
  dps quando recuperar, marcar os feitos */

  /* function checkInputs() {
    // se todos inputs forem verdadeiros
    // setAllChecked(false);
  } */

  // formato dos dados a serem salvos:
  // inProgressRecipes
  /* {
    cocktails: {
      id-da-bebida: [lista-de-ingredientes-utilizados],
      ...
    },
    meals: {
      id-da-comida: [lista-de-ingredientes-utilizados],
      id-da-comida: [lista-de-ingredientes-utilizados],
      id-da-comida: [lista-de-ingredientes-utilizados],
      ...
    }
  } */

  // função para pegar as receitas do local storage
 /*  const getInProgressRecepies = () => {
    const recepiesInProgressString = localStorage.getItem('inProgressRecipes');
    const recepiesInProgress = JSON.parse(recepiesInProgressString);
    return recepiesInProgress;
  }; */

  return (
    <div>
      { allIngredients.map((elem, index) => (
        <div key={ index }>
          <label htmlFor="ingredient">
            <input
              id="ingredient"
              data-testid={ `${index}-ingredient-step` }
              type="checkbox"
            />
            { elem }
            {' '}
            -
            { allMeasure[index] }
          </label>
        </div>))}
    </div>
  );
}

IngredientsMeasure.propTypes = {
  detailsRecepie: PropTypes.shape({
    idMeal: PropTypes.number,
  }).isRequired,
};

export default IngredientsMeasure;
