// if (!localStorage.getItem('inProgressRecipes')) {
//   const inProgressRecipes = JSON.stringify({
//     cocktails: { [idDrink]: [labelValue] },
//   });
//   localStorage.setItem('inProgressRecipes', inProgressRecipes);
// } else if (localStorage.getItem('inProgressRecipes') && listIngredients) {
//   const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
//   if (inProgressRecipes.cocktails) {
//     let { cocktails } = inProgressRecipes;
//     const wasStarted = Object.keys(cocktails).some((key) => key === idDrink);
//     if (wasStarted) {
//       cocktails[idDrink].push(labelValue);
//     } else {
//       const recipeProgress = { [idDrink]: [labelValue] };
//       cocktails = { ...cocktails, ...recipeProgress };
//     }
//     inProgressRecipes.cocktails = cocktails;
//     localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
//   }
// }
import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import ShareBtn from '../../components/componentsDetails/ShareBtn';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { drinkById } from '../../services/apiRequests';

export default function DrinkInProgress() {
  const { idDrink } = useParams();
  const [drinkDetails, setDrinkDetails] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [progress, setProgress] = useState([]);
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    const fetchDrink = async () => {
      const drink = await drinkById(idDrink);
      setDrinkDetails(drink);
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (inProgressRecipes && progress
        .length === 0 && Object.keys(inProgressRecipes.cocktails)
        .some((key) => key === idDrink)) {
        const { cocktails } = inProgressRecipes;
        const loadedProgress = cocktails[idDrink];
        setProgress(loadedProgress);
        const inputs = document.querySelectorAll('input');
        if (inputs) {
          inputs.forEach((input) => {
            if (loadedProgress.some((value) => value === input.parentElement
              .querySelector('label').innerText)) {
              input.defaultChecked = true;
              input.parentElement
                .querySelector('label').style.textDecoration = 'line-through';
            }
          });
        }
      }
    };
    fetchDrink();
  }, [idDrink, progress]);

  const retObj = Object.entries(drinkDetails);
  const listIngredients = retObj.filter((meal) => (
    meal[0].includes('Ingredient') && meal[1]
  ));
  const filterAlcoohol = retObj.filter((meal) => {
    const noAlcool = meal[1] !== ' ' && meal[1] !== null;
    return meal[0].includes('Measure') && noAlcool;
  });

  const progressRecipe = async (labelValue) => {
    let updatedProgress = [];
    console.log(labelValue);
    if (!progress.some((value) => value === labelValue)) {
      updatedProgress = progress.concat(labelValue);
      await setProgress(updatedProgress);
    } else {
      updatedProgress = progress.filter((ingredient) => ingredient !== labelValue);
      await setProgress(updatedProgress);
    }
    let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressRecipes) {
      inProgressRecipes = {
        cocktails: { [idDrink]: updatedProgress },
      };
    } else {
      let { cocktails } = inProgressRecipes;
      if (inProgressRecipes.cocktails) {
        cocktails[idDrink] = updatedProgress;
      } else {
        const recipeProgress = { [idDrink]: [...updatedProgress] };
        cocktails = { ...cocktails, ...recipeProgress };
      }
      inProgressRecipes.cocktails = cocktails;
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  };

  const isDisabled = () => {
    const el = document.querySelectorAll('input');
    if (!(Array.from(el).every((x) => x.checked))) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  return (
    <div onChange={ isDisabled }>
      <img
        src={ drinkDetails.strDrinkThumb }
        alt="imagem da bebida"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ drinkDetails.strDrink }</h1>

      <ShareBtn id={ idDrink } type="bebidas"/>
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="favoritar" />
      </button>
      <h2 data-testid="recipe-category">{ drinkDetails.strAlcoholic }</h2>
      <h3>Ingredientes:</h3>
      <ul>
        {listIngredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              onClick={ (ev) => {
                if (ev.target.defaultChecked) {
                  ev.target.defaultChecked = false;
                  ev.target.checked = false;
                } else {
                  ev.target.defaultChecked = true;
                  ev.target.checked = true;
                }
              } }
              onChange={ (ev) => {
                const label = ev.target.parentElement.querySelector('label');
                progressRecipe(label.innerText);
                if (ev.target.defaultChecked) {
                  label.style.textDecoration = 'line-through';
                } else if (!ev.target.defaultChecked) {
                  ev.target.defaultChecked = false;
                  label.style.textDecoration = 'none';
                }
              } }
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
      <button
        disabled={ disabled }
        type="button"
        data-testid="finish-recipe-btn"
        className="finishRecipe"
        onClick={ () => setRedirect(true) }
      >
        Finalizar Receita
      </button>
      { redirect && <Redirect to="/receitas-feitas" />}
    </div>
  );
}
