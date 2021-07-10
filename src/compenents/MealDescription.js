import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../contexts/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import DrinkCards from './DrinkCards';
import '../styles/MealDescription.css';

function MealDescription({ recipe }) {
  const { recomendations } = useContext(RecipesContext);
  console.log(recomendations);
  const {
    strMealThumb, strMeal, strCategory, strInstructions, strYoutube,
  } = recipe;
  const body = document.querySelector('body');

  const ingredients = Object.entries(recipe)
    .filter(([key, value]) => (key.includes('strIngredient') ? value : null))
    .map((ingredient) => ingredient[1]);
  console.log(ingredients);

  const measures = Object.entries(recipe)
    .filter(([key, value]) => (key
      .includes('strMeasure') ? value : null))
    .map((measure) => measure[1])
    .filter((measure) => measure.length > 1);
  console.log(measures);

  const handleScroll = (event) => {
    body.style.overflowY = 'hidden';
    const scrollValue = 300;
    if (event.deltaY > 0) {
      event.target.scrollBy(scrollValue, 0);
    } else {
      event.target.scrollBy(-scrollValue, 0);
    }
  };

  const handleBodyScroll = () => {
    body.style.overflowY = 'scroll';
  };

  return (
    <>
      <section className="detail-container" onWheel={ handleBodyScroll }>
        <img
          data-testid="recipe-photo"
          src={ strMealThumb }
          alt="comida"
          className="recomedation-img"
        />
        <h1 data-testid="recipe-title">{ strMeal }</h1>
        <button data-testid="share-btn" type="button">
          <img src={ shareIcon } alt="botão de compartilhar" />
        </button>
        <button data-testid="favorite-btn" type="button">
          <img src={ whiteHeartIcon } alt="botão de favoritar" />
        </button>
        <h3 data-testid="recipe-category">{ strCategory }</h3>
        <h2>Ingredients</h2>
        { ingredients.map((ingredient, index) => (
          <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`- ${ingredient} - ${measures[index]}`}
          </p>
        ))}
        <p data-testid="instructions">{ strInstructions }</p>
        <iframe
          data-testid="video"
          title="Recipe"
          src={ strYoutube.replace('watch?v=', 'embed/') }
        />
      </section>
      <section className="carousel">
        <section className="recipes" onWheel={ handleScroll }>
          { recomendations.map((recomendation, index) => (
            <DrinkCards
              data={ recomendation }
              linkTestid={ `${index}-recomendation-card` }
              titleTestid={ `${index}-recomendation-title` }
              index={ index }
              key={ recomendation.idDrink }
            />))}
        </section>
      </section>
      <button
        type="button"
        className="start-recipe"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </>
  );
}

MealDescription.propTypes = {
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
  }),
}.isRequired;

export default MealDescription;
