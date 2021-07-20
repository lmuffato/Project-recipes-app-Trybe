import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import getData from '../Services/getData';

const FinishBtn = ({ checksDone, currentProduct, idn }) => {
  const history = useHistory();
  const objMeal = {
    type: 'comida',
    alcoholicOrNot: '',
    area: currentProduct[0].strArea,
  };
  const objDrink = {
    type: 'bebida',
    alcoholicOrNot: currentProduct[0].strAlcoholic,
    area: '',
  };
  const [obj] = useState(idn[1] === 'Meal' ? objMeal : objDrink);
  const local = localStorage.getItem('doneRecipes');
  const [doneRecipesList, setDoneRecipesList] = React
    .useState(local ? JSON.parse(local) : null);

  const handleClick = () => {
    const pArray = currentProduct[0];
    const recipeDone = {
      id: pArray[`id${idn[1]}`],
      type: obj.type,
      area: obj.area,
      category: pArray.strCategory,
      alcoholicOrNot: obj.alcoholicOrNot,
      name: pArray[`str${idn[1]}`],
      image: pArray[`str${idn[1]}Thumb`],
      doneDate: getData(),
      tags: pArray.strTags ? pArray.strTags.split(',') : [],
    };
    if (doneRecipesList) {
      const recipesListArray = [...doneRecipesList, recipeDone];
      setDoneRecipesList(recipesListArray);
      localStorage.setItem('doneRecipes', JSON.stringify(recipesListArray));
    } else if (!doneRecipesList) {
      const recipesListArray = [recipeDone];
      setDoneRecipesList(recipesListArray);
      localStorage.setItem('doneRecipes', JSON.stringify(recipesListArray));
    }
    history.push('/receitas-feitas');
  };
  return (
    <button
      data-testid="finish-recipe-btn"
      type="button"
      onClick={ handleClick }
      disabled={ checksDone !== document.querySelectorAll('label').length }
    >
      Finalizar
    </button>
  );
};

FinishBtn.propTypes = {
  checksDone: PropTypes.number.isRequired,
}.isRequired;

export default FinishBtn;
