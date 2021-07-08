import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import copy from 'clipboard-copy';

import LinkIcon from '../../components/shared/link';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import Button from '../../components/shared/button';
import { getDrink, getMeals } from '../../service/recipesApi';

function Drink() {
  const [drink, setDrink] = useState();
  const [foods, setFoods] = useState([]);
  const [shared, setShared] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  const settingsSlide = {
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  async function loadData() {
    const drinkData = await getDrink(id);
    setDrink(drinkData.drinks[0]);

    const recommendedData = await getMeals();
    const { meals } = recommendedData;
    setFoods([meals[0], meals[1], meals[2], meals[3], meals[4], meals[5]]);
  }

  function getIngredients(drinkDetail) {
    const ingredientsSize = 20;
    const ingredients = [];

    for (let index = 0; index <= ingredientsSize; index += 1) {
      const ingredient = drinkDetail[`strIngredient${index}`];
      const measure = drinkDetail[`strMeasure${index}`];

      if (ingredient) {
        const ingredientElement = (
          <span data-testid={ `${index - 1}-ingredient-name-and-measure` }>
            { `${ingredient} - ${measure}` }
          </span>
        );
        ingredients.push(ingredientElement);
      }
    }

    return ingredients;
  }

  async function copyLink() {
    await copy(`http://localhost:3000/bebidas/${id}`);
    setShared(true);
  }

  function renderDrink() {
    return (
      <>
        <img
          src={ drink.strDrinkThumb }
          alt="Comida"
          data-testid="recipe-photo"
          width="200"
        />
        <h1 data-testid="recipe-title">{ drink.strDrink }</h1>
        <Button
          dataTestid="share-btn"
          name={ <img src={ shareIcon } alt="share recipe" /> }
          onClick={ copyLink }
          type="button"
        />
        <LinkIcon
          href="#"
          imgPath={ whiteHeartIcon }
          imgAlt="#"
          testIdLink="favorite-btn"
        />
        { shared && <span>Link copiado!</span> }
        <p data-testid="recipe-category">{ drink.strAlcoholic }</p>
        <p data-testid="instructions">{ drink.strInstructions }</p>
        { getIngredients(drink) }
        <Slider { ...settingsSlide }>
          { foods.map((food, index) => (
            <div key={ food.idMeal } data-testid={ `${index}-recomendation-card` }>
              <h3 data-testid={ `${index}-recomendation-title` }>{food.strMeal}</h3>
            </div>))}
        </Slider>
      </>
    );
  }

  function redirectToInitRecipe() {
    history.push(`/bebidas/${id}/in-progress`);
  }

  useEffect(() => {
    loadData().then();
  }, []);

  return (
    <main className="recipe__details">
      { drink ? renderDrink() : <span>Loading...</span> }
      <Button
        type="button"
        onClick={ redirectToInitRecipe }
        name="Iniciar Receita"
        className="button_fix_bottom"
        dataTestid="start-recipe-btn"
      />
    </main>
  );
}

export default Drink;
