import { object } from 'prop-types';
import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

function Ingredientes({ params: { ingredientsList, data } }) {
// function Ingredientes({ params: { ingredientsList, data, setIsDisabled } }) {
  const [ingArray, setIngArray] = useState([]);
  const [LSG, setLSG] = useState([]);
  // const [isChecked, setIsChecked] = useState(false);

  // let setArrayCheck = [];

  // const LOCATION = useLocation();

  const updateLocalStorage = () => {
    const initalLocalStorage = {
      cocktails: [],
      meals: [],
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(initalLocalStorage));
  };

  // const getLocalStorage = () => {
  //   const progressRecipes = JSON.parse(localStorage
  //     .getItem('inProgressRecipes'));
  //   console.log(progressRecipes);
  //   // if (LSG !== null) {
  //   //   const { cocktails, meals } = LSG;
  //   //   const elementsTag = document.querySelector('.py-2').nextSibling.childNodes;
  //   //   let valuesMeals;
  //   //   let valuesCocktails;

  //   //   elementsTag.forEach((elementTag, index) => {
  //   //     switch (LOCATION.pathname) {
  //   //     case `/comidas/${data.idMeal}/in-progress`:
  //   //       valuesMeals = Object.values(meals);
  //   //       valuesMeals[0].forEach((valueMeal) => {
  //   //         if (index === valueMeal) {
  //   //           elementsTag[index].firstChild.className = 'isCheckedCss';
  //   //           elementsTag[index].firstChild.firstChild.checked = true;
  //   //         }
  //   //       });
  //   //       break;
  //   //     case `/bebidas/${data.idDrink}/in-progress`:
  //   //       valuesCocktails = Object.values(cocktails);
  //   //       valuesCocktails[0].forEach((valueCocktail) => {
  //   //         if (index === valueCocktail) {
  //   //           elementsTag[index].firstChild.className = 'isCheckedCss';
  //   //           elementsTag[index].firstChild.firstChild.checked = true;
  //   //         }
  //   //       });
  //   //       break;
  //   //     default:
  //   //       break;
  //   //     }
  //   //   });
  //   // }
  // };

  // const createArrayCheck = () => {
  //   const array = [];
  //   ingredientsList.forEach((item, index) => {
  //     array.push(false);
  //   });
  //   setArrayCheck = array;
  // };

  // const btnCheck = () => {

  // };

  // refatorar tudo nesse component

  const isCheckedBool = ({ target }) => {
    const { checked } = target;
    if (checked) {
      setIngArray([...ingArray, target.id]);
      target.parentNode.className = 'isCheckedCss';
      const isClass = target.parentNode.className;
      return isClass;
    }
    target.parentNode.className = '';
    const notClass = target.parentNode.className;
    return notClass;
  };

  useEffect(() => {
    const progressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes'));

    if (progressRecipes === null) return updateLocalStorage();
    setLSG(progressRecipes);
    console.log(LSG);

    // getLocalStorage();
    // createArrayCheck();
    // btnCheck();
  }, []);

  useEffect(() => {
    const setLocalStorage = () => {
      const foodsOrCocktails = Object.keys(data)
        .find((item) => item === 'idDrink' || item === 'idMeal');

      const progressRecipes = JSON.parse(localStorage
        .getItem('inProgressRecipes'));

      if (progressRecipes.meals === []) {
        console.log('entrei', foodsOrCocktails);
      }
    };
    setLocalStorage();
  }, [data, ingArray]);

  return (
    <div className="ingredientes">
      {ingredientsList.map((ingredient, index) => (
        <div
          key={ index }
          className="d-flex align-items-baseline"
          data-testid={ `${index}-ingredient-step` }
        >
          <label
            htmlFor={ index }
          >
            <input
              className="mr-2"
              type="checkbox"
              name={ ingredient[1] }
              id={ index }
              onClick={ isCheckedBool }
              // checked={ arrayCheck[index] }
            />
            {`Ingrediente ${index}: ${ingredient[1]}`}
          </label>
        </div>
      ))}
    </div>
  );
}

Ingredientes.propTypes = {
  params: object,
}.isRequired;

export default Ingredientes;
