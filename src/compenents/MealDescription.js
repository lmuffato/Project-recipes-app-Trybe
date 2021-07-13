import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipesContext from '../contexts/RecipesContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/MealDescription.css';
import InteractiveButtons from './InteractiveButtons';
import Recomendations from './Recomendations';

function MealDescription({ recipe, recipeId }) {
  const { recomendations } = useContext(RecipesContext);
  const {
    idMeal, strMealThumb, strMeal, strCategory, strInstructions, strYoutube,
  } = recipe;
  // Estados fake, até poder pegar o estado do localStorage
  const [isFav, setIsFav] = useState(false);
  // const [isStarted, setIsStarted] = useState(false);
  const body = document.querySelector('body');

  const ingredients = Object.entries(recipe)
    .filter(([key, value]) => (key.includes('strIngredient') ? value : null))
    .map((ingredient) => ingredient[1]);

  const measures = Object.entries(recipe)
    .filter(([key, value]) => (key
      .includes('strMeasure') ? value : null))
    .map((measure) => measure[1])
    .filter((measure) => measure.length > 1);

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
        <InteractiveButtons idRecipe={ `comidas/${idMeal}` } />
        { /* Botão temporário */}
        <button
          data-testid="favorite-btn"
          type="button"
          onClick={ () => setIsFav(!isFav) }
          src={ isFav ? blackHeartIcon : whiteHeartIcon }
        >
          <img src={ isFav ? blackHeartIcon : whiteHeartIcon } alt="botão de favoritar" />
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
          { recomendations.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
            <Recomendations
              index={ index }
              key={ idDrink }
              id={ idDrink }
              thumb={ strDrinkThumb }
              recipeName={ strDrink }
            />
          ))}
        </section>
      </section>
      <Link to={ `/comidas/${recipeId}/in-progress` }>
        <button
          type="button"
          className="start-recipe"
          data-testid="start-recipe-btn"
        >
          Iniciar Receita
          {/* { isStarted ? 'Continuar Receita' : 'Iniciar Receita' } */}
        </button>
      </Link>
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
