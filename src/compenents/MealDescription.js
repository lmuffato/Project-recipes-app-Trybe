import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipesContext from '../contexts/RecipesContext';
import '../styles/Recomendations.css';
import ShareButton from './ShareButton';
import Recomendations from './Recomendations';
import FavoriteBtn from './FavoriteBtn';
import checkInProgress from '../services/checkInProgress';

function MealDescription({ recipe, recipeId }) {
  const { recomendations, setIsFavorite } = useContext(RecipesContext);
  const {
    idMeal, strArea, strMealThumb, strMeal, strCategory, strInstructions, strYoutube,
  } = recipe;

  const ingredients = Object.entries(recipe)
    .filter(([key, value]) => (key.includes('strIngredient') ? value : null))
    .map((ingredient) => ingredient[1]);

  const measures = Object.entries(recipe)
    .filter(([key, value]) => (key
      .includes('strMeasure') ? value : null))
    .map((measure) => measure[1])
    .filter((measure) => measure.length > 1);

  const getLocalStr = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let checkLocalStr;

  if (getLocalStr !== null) {
    // procura o recipeId no LS
    checkLocalStr = Object.values(getLocalStr)
      .find(({ id: strId }) => strId === recipeId);
  }

  if (checkLocalStr) {
    setIsFavorite(true);
  } else {
    setIsFavorite(false);
  }

  checkInProgress();

  const checkStart = () => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(inProgress);
    if (inProgress && Object.keys(inProgress.meals).find((key) => key === idMeal)) {
      return 'Continuar Receita';
    }
    return 'Iniciar Receita';
  };

  return (
    <>
      <main className="main-detail">
        <img
          data-testid="recipe-photo"
          src={ strMealThumb }
          alt="comida"
          className="recomedation-img"
        />
        <section className="title-and-buttons">
          <h1 data-testid="recipe-title">{ strMeal }</h1>
          <section className="interaction-buttons">
            <ShareButton idRecipe={ `comidas/${idMeal}` } />
            <FavoriteBtn
              id={ idMeal }
              type="comida"
              area={ strArea }
              category={ strCategory }
              alcoholicOrNot=""
              name={ strMeal }
              image={ strMealThumb }
            />
          </section>
        </section>
        <h3 data-testid="recipe-category">{ strCategory }</h3>
        <h2>Ingredients</h2>
        { ingredients.map((ingredient, index) => (
          <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`- ${ingredient} - ${measures[index] === undefined
              ? 'at taste' : measures[index]}`}
          </p>
        ))}
        <p data-testid="instructions">{ strInstructions }</p>
        { strYoutube && (
          <iframe
            data-testid="video"
            title="Recipe"
            src={ strYoutube.replace('watch?v=', 'embed/') }
          />
        )}
      </main>
      <section>
        <section className="recipes">
          { recomendations.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
            <Recomendations
              index={ index }
              key={ idDrink }
              id={ idDrink }
              thumb={ strDrinkThumb }
              pathname={ `/bebidas/${idDrink}` }
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
          { checkStart() }
          {/* Iniciar Receita */}
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
