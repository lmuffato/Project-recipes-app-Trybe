import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipesContext from '../contexts/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import DrinkCards from './DrinkCards';
import '../styles/MealDescription.css';

function MealDescription({ recipe, recipeId }) {
  const { recomendations } = useContext(RecipesContext);
  console.log(recomendations);
  const {
    idMeal, strMealThumb, strMeal, strCategory, strInstructions, strYoutube,
  } = recipe;
  const [isCopy, setIsCopy] = useState(null);
  const body = document.querySelector('body');

  // Estado fake, até poder pegar o estado do localStorage
  // const [start, setStart] = useState(false);

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
    // setStart(true);
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

  const copyToClipboard = ({ target }) => {
    setIsCopy(true);
    console.log(target);
    const { alt } = target;
    const path = `http://localhost:3000/${alt}`;
    navigator.clipboard.writeText(path);
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
        <button data-testid="share-btn" type="button" onClick={ copyToClipboard }>
          <img src={ shareIcon } alt={ `comidas/${idMeal}` } />
        </button>
        <button data-testid="favorite-btn" type="button">
          <img src={ whiteHeartIcon } alt="botão de favoritar" />
        </button>
        {isCopy ? <span>Link copiado!</span> : null}
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
              index={ index }
              linkTestid={ `${index}-recomendation-card` }
              titleTestid={ `${index}-recomendation-title` }
              key={ recomendation.idDrink }
            />))}
        </section>
      </section>
      <Link to={ `/comidas/${recipeId}/in-progress` }>
        <button
          type="button"
          className="start-recipe"
          data-testid="start-recipe-btn"
        >
          Iniciar Receita
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
