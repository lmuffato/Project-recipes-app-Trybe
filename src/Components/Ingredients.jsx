import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FoodContext } from '../Context/FoodProvider';
import InitIngredients from './InitIngredients';

const Ingredients = ({ currentProduct, page }) => {
  const { checksDone, setChecksDone } = useContext(FoodContext);
  const [ingredients] = React.useState(InitIngredients(currentProduct, page));
  // const initIngredients = [];
  // let length = 0;
  // const lengthMeal = 20;
  // const lengthDrink = 15;
  // if (page === 'comidas') length = lengthMeal;
  // if (page === 'bebidas') length = lengthDrink;
  // for (let i = 1; i <= length; i += 1) {
  //   currentProduct.forEach((elem) => {
  //     if (elem[`strIngredient${i}`] !== null || elem[`strMeasure${i}`] !== null) {
  //       initIngredients
  //         .push(`${elem[`strIngredient${i}`]} - ${elem[`strMeasure${i}`]}`);
  //     }
  //   });
  // }
  // React.useEffect(() => { InitIngredients(currentProduct, page); }, []);

  const handleClick = (event) => {
    if (event.target.tagName === 'INPUT') {
      event.target.parentNode.classList.toggle('check');
      if (event.target.parentNode.classList.contains('check')) {
        setChecksDone(checksDone + 1);
      } else {
        setChecksDone(checksDone - 1);
      }
    }
  };

  return (
    <ul>

      {ingredients.map((ingredient, index) => {
        const lengthMax = 4;
        const lengthMmax2 = 3;
        if (ingredient.length !== 0 && ingredient.length !== lengthMax
          && ingredient.length !== lengthMmax2) {
          return (
            <>
              <label
                type="button"
                htmlFor={ ingredient }
                data-testid={ `${index}-ingredient-step` }
                data-key={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  id={ ingredient }
                  name={ ingredient }
                  onClick={ handleClick }
                />
                {ingredient}
              </label>
              <br />
            </>
          );
        }
        return null;
      })}
    </ul>
  );
};

Ingredients.propTypes = {
  currentProduct: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.string.isRequired,
}.isRequired;

export default Ingredients;
