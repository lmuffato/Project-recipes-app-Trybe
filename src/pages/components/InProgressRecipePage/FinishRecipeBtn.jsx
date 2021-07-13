import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript como fiz o doneDate
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/padStart adiciona 0 na frente dos numeros de apenas um digito
const handleClick = (recipe) => {
  console.log(recipe);
  const { idMeal, idDrink, strArea, strCategory, strMeal,
    strMealThumb, strTags, strAlcoholic, strDrink, strDrinkThumb } = recipe;
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const doneDate = `${dd}/${mm}/${yyyy}`;
  let recipeDone = {};
  if (idMeal) {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes.some((recip) => recip.id === idMeal)) {
      console.log('a');
    } else {
      recipeDone = {
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
        doneDate,
        tags: strTags.split(','),
      };
      doneRecipes.push(recipeDone);
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    }
  } else if (idDrink) {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes.some((recip) => recip.id === idDrink)) {
      console.log('a');
    } else {
      recipeDone = {
        id: idDrink,
        type: 'bebida',
        area: '',
        category: '',
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
        doneDate,
        tags: '',
      };
      doneRecipes.push(recipeDone);
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    }
  }
};
export default function FinishRecipeBtn(props) {
  const [button, setButton] = useState(true);
  const { recipe: { idMeal, idDrink }, inProgressUpdate } = props;

  useEffect(() => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (idMeal && inProgress.meals[idMeal]) {
      setButton(!inProgress.meals[idMeal].every((meal) => meal[1] === true));
    } if (idDrink && inProgress.cocktails[idDrink]) {
      setButton(!inProgress.cocktails[idDrink].every((cocktail) => cocktail[1] === true));
    }
  }, [inProgressUpdate]);

  const a = JSON.parse(localStorage.getItem('doneRecipes'));
  if (!a) {
    console.log(a);
    const b = [];
    localStorage.setItem('doneRecipes', JSON.stringify(b));
    console.log(b);
  }

  return (
    <div className="inProgress-div-btn">
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="finish-recipe-btn"
          disabled={ button }
          onClick={ () => handleClick(props.recipe) }
        >
          Finalizar receita
        </button>
      </Link>
    </div>
  );
}

FinishRecipeBtn.propTypes = {
  recipe: PropTypes.shape = {
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
  },
  inProgressUpdate: PropTypes.func.isRequired,
};

FinishRecipeBtn.defaultProps = {
  recipe: PropTypes.shape = {
    idMeal: false,
    idDrink: false,
  },
};
