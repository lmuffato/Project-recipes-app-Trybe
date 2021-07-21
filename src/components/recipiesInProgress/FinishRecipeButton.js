import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import AppContext from '../../contexts/app/AppContext';

import iconDone from '../../icons/appIcons/finalizarReceita.png';

const getDoneRecipes = () => {
  const dataLS = JSON.parse(localStorage.getItem('doneRecipes'));
  return dataLS || false;
};

const addToDoneRecipes = (el, activeScreen) => {
  const data = getDoneRecipes();
  let newEl;

  console.log(el);

  if (activeScreen === 'food') {
    newEl = {
      id: el.idMeal,
      name: el.strMeal,
      type: 'comida',
      image: el.strMealThumb,
      alcoholicOrNot: el.strAlcoholic || '',
      category: el.strCategory,
      area: el.strArea || '',
      doneDate: new Date(),
      tags: el.strTags ? el.strTags.split(',') : '' || [],
    };
  } else {
    newEl = {
      id: el.idDrink,
      name: el.strDrink,
      type: 'bebida',
      image: el.strDrinkThumb,
      alcoholicOrNot: el.strAlcoholic || '',
      category: el.strCategory,
      area: el.strArea || '',
      doneDate: new Date(),
      tags: el.strTags ? el.strTags.split(',') : '' || [],
    };
  }

  if (data.length) {
    localStorage.setItem('doneRecipes', JSON.stringify([...data, newEl]));
  } else {
    localStorage.setItem('doneRecipes', JSON.stringify([{ ...newEl }]));
  }
};

export default function FinishRecipeButton() {
  const {
    recipeInfo,
    recipeIngredients,
    ingredientsInProgress,
    screenActive,
    setIngredientsInProgress,
  } = useContext(AppContext);
  const [textButton] = useState('Finalizar Receita');
  const [redirect, setRedirect] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const checkRecipieFinalized = () => {
    console.log(recipeIngredients);
    console.log(ingredientsInProgress);
    if (recipeIngredients.length === 0
      || recipeIngredients.length !== ingredientsInProgress.length) {
      return setButtonDisabled(true);
    } return setButtonDisabled(false);
  };

  useEffect(() => {
    checkRecipieFinalized();
  }, [recipeInfo, ingredientsInProgress]);

  const buttonFinalizar = () => {
    setIngredientsInProgress([]);
    setRedirect(true);
  };

  const redirectFunc = () => {
    if (redirect === true) {
      addToDoneRecipes(recipeInfo, screenActive);
      return (<Redirect to="/receitas-feitas" />);
    }
    return null;
  };

  return (
    <span>
      <Button
        type="buton"
        data-testid="finish-recipe-btn"
        onClick={ buttonFinalizar }
        disabled={ buttonDisabled }
      >
        {textButton}
        {buttonDisabled ? '' : <img src={ iconDone } alt="teste" />}
      </Button>
      {redirectFunc()}
    </span>
  );
}

const Button = styled.button`
  width: 80%;
  height: 50px;
  background-color: rgb(214, 168, 40);
  font-family: 'Montserrat';
  font-weight: bold;
  border-radius: 100px;
  position: fixed;
  bottom: 0px;
  margin: 0 auto;
  left: 0;
  right: 0;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 25px;
  color: ${({ disabled }) => (disabled ? 'rgaa(255,255,255,0.4)' : 'rgb(255,255,255)')};

  img {
    width: 20px;
    height: 20px;
    margin-left: 10px;
  }
`;

/*
const Button = styled.button`
  width: 80%;
  height: 50px;
  background-color: green;
  position: fixed;
  bottom: 0px;
  margin: 0 auto;
  left: 0;
  right: 0;
`;
*/
