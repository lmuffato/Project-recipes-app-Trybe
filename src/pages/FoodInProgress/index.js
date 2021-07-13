import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { foodById } from '../../services/apiRequests';

export default function FoodInProgress() {
  const [foodDetails, setFoodDetails] = useState({});
  const { idMeal } = useParams();

  useEffect(() => {
    const fetchFood = async () => {
      const food = await foodById(idMeal);
      setFoodDetails(food);
    };

    fetchFood();
  }, [idMeal]);

  const retObj = Object.entries(foodDetails);
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
        src={ foodDetails.strMealThumb }
        alt="imagem da comida"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ foodDetails.strMeal }</h1>
      <button type="button" data-testid="share-btn">
        <img src={ shareIcon } alt="compartilhar" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="favoritar" />
      </button>
      <h2 data-testid="recipe-category">{ foodDetails.strCategory }</h2>
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
      <h2 data-testid="instructions">{ foodDetails.strInstructions }</h2>
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
