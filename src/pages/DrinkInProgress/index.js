import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { drinkById } from '../../services/apiRequests';

export default function DrinkInProgress() {
  const [drinkDetails, setDrinkDetails] = useState({});
  const { idDrink } = useParams();
  console.log(drinkDetails);
  useEffect(() => {
    const fetchDrink = async () => {
      const drink = await drinkById(idDrink);
      setDrinkDetails(drink);
    };

    fetchDrink();
  }, [idDrink]);

  const retObj = Object.entries(drinkDetails);
  const listIngredients = retObj.filter((meal) => (
    meal[0].includes('Ingredient') && meal[1]
  ));
  const filterAlcoohol = retObj.filter((meal) => {
    const noAlcool = meal[1] !== ' ' && meal[1] !== null;
    return meal[0].includes('Measure') && noAlcool;
  });

  const disabled = (element) => {
    console.log(element.querySelectorAll('input'));
    const el = element.querySelectorAll('input');
    const value = Array.from(el).every((x) => x.checked === true);
    if (value) {
      document.querySelector('.finishRecipe').disabled = '';
    } else {
      document.querySelector('.finishRecipe').disabled = 'disabled';
    }
  };

  const check = (e) => {
    if (e.target.checked) {
      disabled(e.target.parentElement.parentElement);
      e.target.parentElement.querySelector('label').style.textDecoration = 'line-through';
    } else {
      disabled(e.target.parentElement.parentElement);
      e.target.parentElement.querySelector('label').style.textDecoration = 'none';
    }
  };

  return (
    <div>
      <img
        src={ drinkDetails.strDrinkThumb }
        alt="imagem da bebida"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ drinkDetails.strDrink }</h1>

      <button type="button" data-testid="share-btn">
        <img src={ shareIcon } alt="compartilhar" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="favoritar" />
      </button>
      <h2 data-testid="recipe-category">{ drinkDetails.strAlcoholic }</h2>
      {console.log(drinkDetails)}
      <h3>Ingredientes:</h3>
      <ul>
        {listIngredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              onClick={ (e) => check(e) }
              type="checkbox"
              id={ `${index}-ingredient-step` }
            />
            <label htmlFor={ `${index}-ingredient-step` }>
              {filterAlcoohol[index] ? (
                `${ingredient[1]} - ${filterAlcoohol[index][1]}`
              ) : (ingredient[1])}
            </label>
          </li>
        ))}
      </ul>
      <h4>Instructions: </h4>
      <h2 data-testid="instructions">{ drinkDetails.strInstructions }</h2>
      <Link to="/receitas-feitas">
        <button
          disabled="disabled"
          type="button"
          data-testid="finish-recipe-btn"
          className="finishRecipe"
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}
