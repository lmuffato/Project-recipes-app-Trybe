import { object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Ingredientes({ params: { ingredientsList, data, setIsDisabled } }) {
  const [ingArray, setIngArray] = useState([]);
  let setArrayCheck = useState([]);
  // const [isChecked, setIsChecked] = useState(false);

  const LOCATION = useLocation();

  const getLocalStorage = () => {
    const progressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes'));

    if (progressRecipes !== null) {
      const { cocktails, meals } = progressRecipes;
      const elementsTag = document.querySelector('.py-2').nextSibling.childNodes;
      let valuesMeals;
      let valuesCocktails;

      elementsTag.forEach((elementTag, index) => {
        switch (LOCATION.pathname) {
        case `/comidas/${data.idMeal}/in-progress`:
          valuesMeals = Object.values(meals);
          valuesMeals[0].forEach((valueMeal) => {
            if (index === valueMeal) {
              elementsTag[index].firstChild.className = 'isCheckedCss';
              elementsTag[index].firstChild.firstChild.checked = true;
            }
          });
          break;
        case `/bebidas/${data.idDrink}/in-progress`:
          valuesCocktails = Object.values(cocktails);
          valuesCocktails[0].forEach((valueCocktail) => {
            if (index === valueCocktail) {
              elementsTag[index].firstChild.className = 'isCheckedCss';
              elementsTag[index].firstChild.firstChild.checked = true;
            }
          });
          break;
        default:
          break;
        }
      });
    }
  };

  const createArrayCheck = () => {
    const array = [];
    ingredientsList.forEach((item, index) => {
      array.push(false);
    });
    setArrayCheck = array;
  };

  const btnCheck = () => {
    const elementsTag = document.querySelector('.ingredientes').childNodes;
    let btnDisabled = 0;
    elementsTag.forEach((item) => {
      const test = item.firstChild.className;
      if (test.includes('isCheckedCss')) {
        btnDisabled += 1;
      }
      if (btnDisabled === elementsTag.length) {
        setIsDisabled(false);
      }
    });
  };

  useEffect(() => {
    getLocalStorage();
    createArrayCheck();
  }, []);

  useEffect(() => {
    btnCheck();
  });

  const localSTSettings = (target) => {
    const foodsOrCocktails = Object.keys(data)
      .find((item) => item === 'idDrink' || item === 'idMeal');

    setIngArray([...ingArray, Number(target.id)]);

    const progressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes'));

    if (progressRecipes !== null) {
      if (foodsOrCocktails === 'idMeal') {
        const newObj = { meals: {
          [data.idMeal]: [...ingArray, Number(target.id)],
        } };
        const oldObject = [newObj];
        localStorage
          .setItem(
            'inProgressRecipes', JSON
              .stringify(oldObject),
          );
      } else {
        localStorage
          .setItem(
            'inProgressRecipes', JSON
              .stringify({
                cocktails: {
                  [data.idDrink]: [...ingArray, Number(target.id)],
                } }),
          );
      }
    }
    if (foodsOrCocktails === 'idMeal') {
      localStorage
        .setItem(
          'inProgressRecipes', JSON
            .stringify({
              meals: {
                [data.idMeal]: [...ingArray, Number(target.id)],
              } }),
        );
    } else {
      localStorage
        .setItem(
          'inProgressRecipes', JSON
            .stringify({
              cocktails: {
                [data.idDrink]: [...ingArray, Number(target.id)],
              } }),
        );
    }
  };

  // refatorar tudo nesse component

  const isCheckedBool = ({ target }) => {
    const { checked } = target;
    if (checked) {
      target.parentNode.className = 'isCheckedCss';
      const isClass = target.parentNode.className;
      localSTSettings(target);
      return isClass;
    }
    target.parentNode.className = '';
    const notClass = target.parentNode.className;
    return notClass;
  };

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
