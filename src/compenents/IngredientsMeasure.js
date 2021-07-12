import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../contexts/RecipesContext';

function IngredientsMeasure({ detailsRecepie }) {
  // const { idMeal } = detailsRecepie;
  const [checkedIngridientsState, setCheckedIngridientsState] = useState(0);
  const { setAllChecked } = useContext(RecipesContext);

  const allIngredients = Object.entries(detailsRecepie)
    .filter((keys) => keys[0]
      .includes('strIngredient') && keys[1] !== null && keys[1] !== '');

  console.log(allIngredients);

  const allMeasure = Object.entries(detailsRecepie)
    .filter((keys) => keys[0]
      .includes('strMeasure') && keys[1] !== null && keys[1] !== '');

  /* salvar os ingredientes feitos, no local storage,
  dps quando recuperar, marcar os feitos */

  const numberIngridients = allIngredients.length;
  // let checkedIngridients = 0;

  function checkInputs() {
    if (numberIngridients === checkedIngridientsState) {
      setAllChecked(false);
    } else {
      setAllChecked(true);
    }
  }

  useEffect(() => {
    checkInputs();
    console.log('Chamou a função');
  }, [checkedIngridientsState]);

  function checkedListIngredients(e) {
    if (e.target.checked === true) {
      setCheckedIngridientsState(checkedIngridientsState + 1);
    }
    if (e.target.checked === false) {
      setCheckedIngridientsState(checkedIngridientsState - 1);
    }
  }

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
              onChange={ (e) => checkedListIngredients(e) }
            />
            { elem[1] }
            {' '}
            -
            {' '}
            { allMeasure[index][1] }
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
