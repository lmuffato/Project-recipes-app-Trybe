import React from 'react';
import PropTypes from 'prop-types';

function DetailsCard({ product, idn }) {
  const pickIngredients = () => {
    const initIngredients = [];
    let length = 0;
    const lengthMeal = 20;
    const lengthDrink = 15;
    if (idn[1] === 'Meal') length = lengthMeal;
    if (idn[1] === 'Drink') length = lengthDrink;
    for (let i = 1; i <= length; i += 1) {
      product.forEach((elem) => {
        if (elem[`strIngredient${i}`] !== null || elem[`strMeasure${i}`] !== null) {
          initIngredients
            .push(`${elem[`strIngredient${i}`]} - ${elem[`strMeasure${i}`]}`);
        }
      });
    }
    return (
      <ul>
        {initIngredients.map((ingredient, index) => {
          const lengthMax = 4;
          const lengthMmax2 = 3;
          if (ingredient.length !== 0 && ingredient.length !== lengthMax
            && ingredient.length !== lengthMmax2) {
            return (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ `${ingredient}-${index}` }
              >
                {ingredient}
              </li>
            );
          }
          return null;
        })}
      </ul>
    );
  };

  return (
    <section>
      {product.map((elem) => (
        <div key={ `id${idn[1]}` }>
          <img
            src={ elem[`str${idn[1]}Thumb`] }
            data-testid="recipe-photo"
            alt="recipe"
          />
          <h2 data-testid="recipe-title">{elem[`str${idn[1]}`]}</h2>

          <h3 data-testid="recipe-category">
            {elem.strCategory}
            -
            {elem.strAlcoholic}
          </h3>
          { pickIngredients() }
          <h3 data-testid="instructions">{elem.strInstructions}</h3>
          { idn[1] === 'Meal' && <iframe
            title="Recipe"
            width="420"
            height="315"
            data-testid="video"
            src={ elem.strYoutube.replace('watch?v=', 'embed/') }
          />}
        </div>
      ))}
    </section>
  );
}

DetailsCard.propTypes = {
  product: PropTypes.arrayOf(PropTypes.object).isRequired,
  idn: PropTypes.number.isRequired,
}.isRequired;

export default DetailsCard;
