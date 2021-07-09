import { element } from 'prop-types';
import React, { useEffect, useState } from 'react';

function Ingredientes({ ingredients: { ingredients, data } }) {
  const [ingArray, setIngArray] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [teste10, setTeste10] = useState(false);

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

  const test3 = () => {
    setIsChecked(ingredients.map((item, index) => false));
  };

  useEffect(() => {
    test3();
    achando();
  }, []);

  const localSTSettings = (target) => {
    console.log(ingredients[target.id], target.id);
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
    let { checked, name, id } = target;
    if (!checked[id]) {
      // document.querySelectorAll('.mr-2')[id].checked = true;
      // target.parentNode.className = 'isCheckedCss';
      localSTSettings(target);
      // return null;
    //   console.log(isChecked[0]);
      return setIsChecked(isChecked.map((element1, index) => {
        if (index === Number(id)) {
          element1 = true;
          return element1;
        }
        return element1;
      }));
    }
    // target.parentNode.className = '';
    // const notClass = target.parentNode.className;
    // return null;
    // document.querySelectorAll('.mr-2')[id].checked = true;
    // return null;
  };

  return (
    <div>
      {ingredients.map((ingredient, index) => {
        return (
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
                checked={ isChecked[index] }
              />
              {`Ingrediente ${index}: ${ingredient[1]}`}
            </label>
          </div>
        )})}
    </div>
  );
}

export default Ingredientes;
