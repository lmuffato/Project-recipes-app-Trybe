import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipesContext from '../contexts/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import MealCards from './MealCards';
import '../styles/MealDescription.css';
import copyToClipboard from '../services/copyToClipboard';

function DrinkDescription({ recipe, recipeId }) {
  const { recomendations } = useContext(RecipesContext);
  const {
    idDrink, strDrinkThumb, strDrink, strCategory, strInstructions, strAlcoholic,
  } = recipe;
  const [isCopy, setIsCopy] = useState(null);
  // Estados fake, até poder pegar o estado do localStorage
  const [isFav, setIsFav] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const body = document.querySelector('body');

  const ingredients = Object.entries(recipe)
    .filter(([key, value]) => (key.includes('strIngredient') ? value : null))
    .map((ingredient) => ingredient[1]);
  console.log(ingredients);

  const measures = Object.entries(recipe)
    .filter(([key, value]) => (key
      .includes('strMeasure') ? value : null))
    .map((ingredient) => ingredient[1])
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
        <img data-testid="recipe-photo" src={ strDrinkThumb } alt="comida" />
        <h1 data-testid="recipe-title">{ strDrink }</h1>
        <button
          data-testid="share-btn"
          type="button"
          onClick={ (event) => copyToClipboard(event, setIsCopy) }
        >
          <img src={ shareIcon } alt={ `bebidas/${idDrink}` } />
        </button>
        <button
          data-testid="favorite-btn"
          type="button"
          onClick={ () => setIsFav(!isFav) }
          src={ isFav ? blackHeartIcon : whiteHeartIcon }
        >
          <img src={ isFav ? blackHeartIcon : whiteHeartIcon } alt="botão de favoritar" />
        </button>
        {isCopy && <span>Link copiado!</span>}
        <h3 data-testid="recipe-category">{`${strCategory} ${strAlcoholic}`}</h3>
        <h2>Ingredients</h2>
        { ingredients.map((ingredient, index) => (
          <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`- ${ingredient} - ${measures[index]}`}
          </p>
        ))}
        <p data-testid="instructions">{ strInstructions }</p>
        <iframe title="YouTube video player" data-testid="video" />
      </section>
      <section className="carousel">
        <section className="recipes" onWheel={ handleScroll }>
          { recomendations.map((recomendation, index) => (
            <MealCards
              data={ recomendation }
              index={ index }
              linkTestid={ `${index}-recomendation-card` }
              titleTestid={ `${index}-recomendation-title` }
              key={ recomendation.idMeal }
            />))}
        </section>
      </section>
      <Link to={ `/bebidas/${recipeId}/in-progress` }>
        <button
          type="button"
          className="start-recipe"
          data-testid="start-recipe-btn"
        >
          { isStarted ? 'Continuar Receita' : 'Iniciar Receita' }
        </button>
      </Link>
    </>
  );
}

DrinkDescription.propTypes = {
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
  }),
}.isRequired;

export default DrinkDescription;
