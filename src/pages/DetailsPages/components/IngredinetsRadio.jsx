import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import makeObjIngredients from '../../../services/formatObjects/makeObjIngredients';
import setIdAndIngredients, { returnIngredientsOfId }
  from '../../../services/localStorage/setIdAndIngredients';

const FORM_CHECK_LABEL_CHECKED = 'form-check-label check';

function altTextDecorationWithId(recipeL) { // funcao chamada qnd o component é atualizado
  const checkboxs = document.getElementsByName('checkboxInput');
  const labelsInOrder = document.getElementsByTagName('label');
  // pego ingredientes q estao no localstorage com esse id ( de recipe)
  const ingredients = returnIngredientsOfId(recipeL);
  // console.log(ingredients[1]);
  if (!ingredients) return null;
  for (let i = 0; i < checkboxs.length; i += 1) {
    // console.log(checkboxs[i].value === ingredients[i]);
    if (checkboxs[i].value === (ingredients[i])) {
      checkboxs[i].checked = true;
      // checkboxs[i].id = 'checked';
      checkboxs[i].setAttribute('checked', true);
      labelsInOrder[i].style.textDecorationLine = 'line-through';
      labelsInOrder[i].className = FORM_CHECK_LABEL_CHECKED;
    }
  }
}

function observeAndEnableBtn() {
  const checkBoxs = document.getElementsByName('checkboxInput');
  const checkeds = [];
  // console.log('observando checkboxs...');
  checkBoxs.forEach((checkbox) => {
    if (checkbox.checked) checkeds.push(checkbox.value);
  });
  if (checkBoxs.length === checkeds.length) { // se a qtd de checkeds for a mesma que chekboxs, entao pode ativar o btn
    const getBtnFinish = document.getElementsByTagName('button');
    getBtnFinish[2].disabled = false;
  } else {
    const getBtnFinish = document.getElementsByTagName('button');
    getBtnFinish[2].disabled = true;
  }
}

const IngredientsRadios = ({ recipe }) => {
  const objIngredients = makeObjIngredients(recipe);
  let arrEntries = [];
  if (objIngredients) {
    arrEntries = Object.entries(objIngredients);
  }

  function altTextDecoration(e) {
    const labels = document.getElementsByTagName('label');
    // const checkboxs = document.getElementsByName('checkboxInput');
    const idCheck = e.target.id;
    if (labels[idCheck].className === FORM_CHECK_LABEL_CHECKED) {
      labels[idCheck].className = 'form-check-label';
      labels[idCheck].style.textDecorationLine = 'none';
    } else {
      labels[idCheck].style.textDecorationLine = 'line-through';
      labels[idCheck].className = FORM_CHECK_LABEL_CHECKED;
    }
  }

  function handleChange(e) {
    altTextDecoration(e); // altera o a classe
    observeAndEnableBtn(); // td vez q eu alterar checkboxs vai verificar se pode ativar btn finish
    // console.log(e.target.checked);
    const checkBoxs = document.getElementsByName('checkboxInput');
    const checkeds = [];
    checkBoxs.forEach((checkbox) => {
      if (checkbox.checked) checkeds.push(checkbox.value);
    });
    // console.log(checkeds);
    const { idMeal, idDrink } = recipe;
    if (idMeal) {
      setIdAndIngredients(idMeal, checkeds, 'meal');
    }
    if (idDrink) {
      setIdAndIngredients(idDrink, checkeds, 'drink');
    }
  }
  useEffect(() => {
    altTextDecorationWithId(recipe);
  }, [recipe]);

  useEffect(() => {
    observeAndEnableBtn();
  });
  // console.log(arrEntries);
  return (
    <ul className="list-group">
      {arrEntries.map((ingredient, index) => (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-step` }
          className="list-group-item"
        >
          <input
            // data-testid={ `${index}-ingredient-step` }
            className="form-check-input"
            key={ index }
            type="checkbox"
            name="checkboxInput"
            value={ `${ingredient[0]}` }
            id={ index }
            onChange={ (e) => handleChange(e) }
          />
          <label
            // className="list-group-item"
            htmlFor={ index }
          >
            {`${ingredient[0]} - ${ingredient[1]}`}
          </label>
        </li>
      )) }
    </ul>

  );
};

IngredientsRadios.propTypes = {
  recipe: PropTypes.object,
}.isRequired;

export default IngredientsRadios;
