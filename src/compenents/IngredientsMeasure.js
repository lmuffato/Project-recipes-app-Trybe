import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../contexts/RecipesContext';
import '../styles/IngredientsMeasure.css';

function IngredientsMeasure({ detailsRecepie }) {
  const [checkedIngridientsState, setCheckedIngridientsState] = useState(0);
  const [doneIngredients, setDoneIngredients] = useState([]);
  const [cocktailsStorage, setcocktailsStorage] = useState({});
  const [allMealsStorage, setAllMealsStorage] = useState({});
  const [otherStorageRecepies, setOtherStorageRecepies] = useState([]);
  const { setAllChecked } = useContext(RecipesContext);
  const { idMeal } = detailsRecepie;

  const allIngredients = Object.entries(detailsRecepie)
    .filter((keys) => keys[0]
      .includes('strIngredient') && keys[1] !== null && keys[1] !== '');

  const allMeasure = Object.entries(detailsRecepie)
    .filter((keys) => keys[0]
      .includes('strMeasure') && keys[1] !== null && keys[1] !== '');

  /* salvar os ingredientes feitos, no local storage,
  dps quando recuperar, marcar os feitos */

  const numberIngridients = allIngredients.length;

  function checkInputs() {
    if (numberIngridients === checkedIngridientsState) {
      setAllChecked(false);
    } else {
      setAllChecked(true);
    }
  }

  function setFirstLocalStorage() {
    const objetoLocalStorage = {
      cocktails: {},
      meals: { [idMeal]: doneIngredients },
    };
    const ingredientListString = JSON.stringify(objetoLocalStorage);
    localStorage.setItem('inProgressRecipes', ingredientListString);
  }

  function upDateLocalStorage() {
    const newLocalStorage = {
      cocktails: cocktailsStorage,
      meals: { ...otherStorageRecepies, [idMeal]: doneIngredients },
    };
    const newLocalStorageString = JSON.stringify(newLocalStorage);
    localStorage.setItem('inProgressRecipes', newLocalStorageString);
    setAllMealsStorage(newLocalStorage.meals);
  }

  function getLocalStorage() {
    const recepiesInProgressString = localStorage.getItem('inProgressRecipes');
    const recepiesInProgress = JSON.parse(recepiesInProgressString);
    if (recepiesInProgress === null) {
      setFirstLocalStorage();
    } else {
      console.log('estou no else');
      setcocktailsStorage(recepiesInProgress.cocktails);
      setAllMealsStorage(recepiesInProgress.meals);
      const otherRecepies = delete allMealsStorage.idMeal;
      setOtherStorageRecepies(otherRecepies);
      console.log(otherStorageRecepies);

      console.log(allMealsStorage);

      const arrayAllMeals = Object.entries(allMealsStorage);
      console.log(arrayAllMeals);
      arrayAllMeals.map((recepies) => {
        console.log(recepies[0]);
        if (recepies[0] === [idMeal]) {
          setDoneIngredients(recepies[1]);
          console.log(recepies[1]);
        }
        return upDateLocalStorage();
      });
    }
  }

  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    checkInputs();
    upDateLocalStorage();
    // getLocalStorage();
    console.log('Chamou a função');
  }, [checkedIngridientsState]);

  function checkedListIngredients(e) {
    if (e.target.checked === true) {
      setCheckedIngridientsState(checkedIngridientsState + 1);
      setDoneIngredients([...doneIngredients, e.target.id]);
    }
    if (e.target.checked === false) {
      setCheckedIngridientsState(checkedIngridientsState - 1);
      const newDoneIngredients = doneIngredients
        .filter((ingridient) => ingridient !== e.target.id);
      setDoneIngredients(newDoneIngredients);
    }
    console.log(e.target.id);
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

  function getIngredientsList() {
    return allIngredients.map((elem, index) => (
      <div key={ index }>
        <label htmlFor={ elem[1] }>
          <input
            id={ elem[1] }
            data-testid={ `${index}-ingredient-step` }
            type="checkbox"
            onChange={ (e) => checkedListIngredients(e) }
          />
          <span className="checked-list">
            { `${elem[1]} - ${allMeasure[index][1]}` }
          </span>
        </label>
      </div>
    ));
  }

  return (
    <div>
      { getIngredientsList() }
      {/* { allIngredients.map((elem, index) => (
        <div key={ index }>
          <label htmlFor="ingredient">
            <input
              id="ingredient"
              data-testid={ `${index}-ingredient-step` }
              type="checkbox"
              onChange={ (e) => checkedListIngredients(e) }
            />
            <span className="checked-list">
              { `${elem[1]} - ${allMeasure[index][1]}` }
            </span>
          </label>
        </div>))} */}
    </div>
  );
}

IngredientsMeasure.propTypes = {
  detailsRecepie: PropTypes.shape({
    idMeal: PropTypes.string,
  }).isRequired,
};

export default IngredientsMeasure;
