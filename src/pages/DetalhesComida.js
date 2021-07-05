import { object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

import { getFoodByID } from '../services/fetchApiDetailsRecipe';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { btn } from '../styles/login';

const indexMock = 0;

function DetalhesComida({ match: { params: { id } } }) {
  const [acctualyFood, setAcctualyFood] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchFood() {
      setIsLoading(true);
      const food = await getFoodByID(id);

      setAcctualyFood(food);
      setIsLoading(false);
    }

    fetchFood();
  }, [id]);

  const handleClick = (e) => {
    e.preventDefault();
  };

  const createRecipe = () => {
    if (acctualyFood) {
      const {
        strMeal,
        strCategory,
        strInstructions,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strIngredient9,
        strIngredient10,
        strIngredient11,
        strIngredient12,
        strIngredient13,
        strMeasure1,
        strMeasure2,
        strMeasure3,
        strMeasure4,
        strMeasure5,
        strMeasure6,
        strMeasure7,
        strMeasure8,
        strMeasure9,
        strMeasure10,
        strMeasure11,
        strMeasure12,
        strMeasure13,
        // strYoutube,
        strMealThumb,
      } = acctualyFood.meals[0];

      console.log('Teste do Includes', acctualyFood.meals[0]);

      const ingredients = [
        `${strIngredient1} ${strMeasure1}`,
        `${strIngredient2} ${strMeasure2}`,
        `${strIngredient3} ${strMeasure3}`,
        `${strIngredient4} ${strMeasure4}`,
        `${strIngredient5} ${strMeasure5}`,
        `${strIngredient6} ${strMeasure6}`,
        `${strIngredient7} ${strMeasure7}`,
        `${strIngredient8} ${strMeasure8}`,
        `${strIngredient9} ${strMeasure9}`,
        `${strIngredient10} ${strMeasure10}`,
        `${strIngredient11} ${strMeasure11}`,
        `${strIngredient12} ${strMeasure12}`,
        `${strIngredient13} ${strMeasure13}`,
      ];

      return (
        <>
          <img alt="Produto" data-testid="recipe-photo" src={ strMealThumb } />

          <h2 data-testid="recipe-title">{ strMeal }</h2>

          <div>
            <button type="button" data-testid="share-btn">
              <img alt="Share link" src={ shareIcon } />
            </button>
            <button type="button" data-testid="favorite-btn">
              <img alt="Favorite button" src={ whiteHeartIcon } />
            </button>
          </div>

          <p data-testid="recipe-category">{ strCategory }</p>

          <ul>
            { ingredients.map((igredient, index) => (
              <li
                key={ igredient }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { igredient }
              </li>))}
          </ul>

          <p data-testid="instructions">{ strInstructions }</p>

          <iframe data-testid="video" width="320" height="240" src="https://www.youtube.com/embed/VVnZd8A84z4" title="YouTube video player" frameBorder="0" />

          {/* <div data-testid={ `${index}-recomendation-card` }>
            Card Receitas Recomendadas
          </div> */}

          <div data-testid={ `${indexMock}-recomendation-card` }>
            Card Receitas Recomendadas
          </div>

          <Button
            variant="success"
            type="button"
            onClick={ handleClick }
            data-testid="start-recipe-btn"
            className={ btn }
          >
            Start recipe
          </Button>
        </>
      );
    }

    return null;
  };

  return !isLoading ? createRecipe() : <span>Loading...</span>;
}

DetalhesComida.propTypes = {
  props: object,
}.isRequired;

export default DetalhesComida;
