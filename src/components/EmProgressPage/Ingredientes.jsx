import { object } from 'prop-types';
import React, { useEffect, useState } from 'react';

function Ingredientes({ params: { ingredientsList, data } }) {
  const [ingArray, setIngArray] = useState([]);
  const [isChecked, setIsChecked] = useState([]);

  const achando = () => {
    const progressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes'));
    // console.log(progressRecipes);
    if (progressRecipes !== null) {
      const { cocktails, meals } = progressRecipes;
      const elements = document.querySelector('.py-2').nextSibling.childNodes;

      const test = Object.values(meals);

      elements.forEach((item, index) => {
        // console.log(item);
        test[0].forEach((element) => {
          // console.log(element);
          if (index === element) {
            elements[index].firstChild.className = 'isCheckedCss';
            elements[index].firstChild.firstChild.checked = true;
          }
        });
      });
    }
  };

  useEffect(() => {
    achando();
  }, []);

  const localSTSettings = (target) => {
    // console.log(ingredientsList[target.id], target.id);
    const progressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes'));
    // console.log(progressRecipes);
    // setInstructArray(...progressRecipes);

    const foodsOrCocktails = Object.keys(data)
      .find((item) => item === 'idDrink' || item === 'idMeal');

    setIngArray([...ingArray, Number(target.id)]);

    if (foodsOrCocktails === 'idMeal') {
      localStorage
        .setItem(
          'inProgressRecipes', JSON
            .stringify({
              ...progressRecipes,
              meals: {
                [data.idMeal]: [...ingArray, Number(target.id)],
              } }),
        );
    } else {
      localStorage
        .setItem(
          'inProgressRecipes', JSON
            .stringify({
              ...progressRecipes,
              cocktails: {
                [data.idDrink]: [...ingArray, Number(target.id)],
              } }),
        );
    }
  };

  const isCheckedBool = ({ target }) => {
    const { checked, name, id } = target;

    if (checked) {
      document.querySelectorAll('.mr-2')[6].checked = true;
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
    <div>
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
              checked={ isChecked }
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
