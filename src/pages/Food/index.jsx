import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import copy from 'clipboard-copy';

import LinkIcon from '../../components/shared/link';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import Button from '../../components/shared/button';
import { getDrinks, getRecipeById } from '../../service/recipesApi';

function Food() {
  const [food, setFood] = useState();
  const [drinksRecommended, setDrinksRecommended] = useState([]);
  const [shared, setShared] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  const settingsSlide = {
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  async function loadData() {
    const foodData = await getRecipeById(id);
    setFood(foodData.meals[0]);

    const recommendedData = await getDrinks();
    const { drinks } = recommendedData;
    setDrinksRecommended([
      drinks[0], drinks[1], drinks[2], drinks[3], drinks[4], drinks[5],
    ]);
  }

  function getIngredients(foodDetail) {
    const ingredientsSize = 20;
    const ingredients = [];

    for (let index = 0; index <= ingredientsSize; index += 1) {
      const ingredient = foodDetail[`strIngredient${index}`];
      const measure = foodDetail[`strMeasure${index}`];

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
    await copy(`http://localhost:3000/comidas/${id}`);
    setShared(true);
  }

  function getVideoId(url) {
    const positionId = url.indexOf('=') + 1;
    return url.substr(positionId);
  }

  function redirectToInitRecipe() {
    history.push(`/comidas/${id}/in-progress`);
  }

  function getVideoIframe(url) {
    return (
      <iframe
        width="560"
        height="315"
        src={ `https://www.youtube.com/embed/${getVideoId(url)}` }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
        data-testid="video"
        allowFullScreen
      />
    );
  }

  function renderFood() {
    return (
      <>
        <img
          src={ food.strMealThumb }
          alt="Comida"
          data-testid="recipe-photo"
          width="200"
        />
        <h1 data-testid="recipe-title">{ food.strMeal }</h1>
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
        <p data-testid="recipe-category">{ food.strCategory }</p>
        <p data-testid="instructions">{ food.strInstructions }</p>
        { getIngredients(food) }
        { getVideoIframe(food.strYoutube) }
        <Slider { ...settingsSlide }>
          { drinksRecommended.map((drink, index) => (
            <div key={ drink.idDrink } data-testid={ `${index}-recomendation-card` }>
              <h3 data-testid={ `${index}-recomendation-title` }>{drink.strDrink}</h3>
            </div>))}
        </Slider>
      </>
    );
  }

  useEffect(() => {
    loadData().then();
  }, []);

  return (
    <main className="recipe__details">
      { food ? renderFood() : <span>Loading...</span> }
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

export default Food;
