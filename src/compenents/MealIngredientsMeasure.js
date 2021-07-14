import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../contexts/RecipesContext';
import '../styles/IngredientsMeasure.css';

function IngredientsMeasure({ detailsRecepie }) {
  const [checkedIngridientsState, setCheckedIngridientsState] = useState(0);
  const { idMeal } = detailsRecepie;
  const ingredientsStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const [doneIngredients, setDoneIngredients] = useState(
    ingredientsStorage ? ingredientsStorage.meals[idMeal] : [],
  );
  const [cocktailsStorage, setcocktailsStorage] = useState({});
  const [allMealsStorage, setAllMealsStorage] = useState({});
  const [otherStorageRecepies, setOtherStorageRecepies] = useState([]);
  const { setAllChecked } = useContext(RecipesContext);

  const allIngredients = Object.entries(detailsRecepie)
    .filter((keys) => keys[0]
      .includes('strIngredient') && keys[1] !== null && keys[1] !== '');

  const allMeasure = Object.entries(detailsRecepie)
    .filter((keys) => keys[0]
      .includes('strMeasure') && keys[1] !== null && keys[1] !== '');

  const numberIngridients = allIngredients.length;

  function checkInputs() {
    if (numberIngridients === doneIngredients.length) {
      return setAllChecked(false);
    }
    return setAllChecked(true);
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
      meals: { ...otherStorageRecepies, [idMeal]: [...doneIngredients] },
    };
    const newLocalStorageString = JSON.stringify(newLocalStorage);
    localStorage.setItem('inProgressRecipes', newLocalStorageString);
    setAllMealsStorage(newLocalStorage.meals);
  }

  function getLocalStorage() {
    const recepiesInProgressString = localStorage.getItem('inProgressRecipes');
    const recepiesInProgress = JSON.parse(recepiesInProgressString);
    if (recepiesInProgressString === null) {
      setFirstLocalStorage();
    } else {
      const { cocktails, meals } = recepiesInProgress;
      setcocktailsStorage(cocktails);
      setAllMealsStorage(meals);
      const otherRecepies = delete allMealsStorage.idMeal;
      setOtherStorageRecepies(otherRecepies);

      if (meals[idMeal] === null) upDateLocalStorage();
    }
  }

  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    checkInputs();
    upDateLocalStorage();
  }, [checkedIngridientsState]);

  function checkedListIngredients(e) {
    if (e.target.checked === true) {
      setCheckedIngridientsState(checkedIngridientsState + 1);
      return setDoneIngredients([...doneIngredients, e.target.id]);
    }
    setCheckedIngridientsState(checkedIngridientsState - 1);
    const newDoneIngredients = doneIngredients
      .filter((ingridient) => ingridient !== e.target.id);
    return setDoneIngredients(newDoneIngredients);
  }

  function getIngredientsList() {
    return allIngredients.map((elem, index) => (
      <div key={ index }>
        <label data-testid={ `${index}-ingredient-step` } htmlFor={ elem[1] }>
          <input
            checked={ doneIngredients.some((element) => element === elem[1]) }
            id={ elem[1] }
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
    </div>
  );
}

IngredientsMeasure.propTypes = {
  detailsRecepie: PropTypes.shape({
    idMeal: PropTypes.string,
  }).isRequired,
};

export default IngredientsMeasure;
