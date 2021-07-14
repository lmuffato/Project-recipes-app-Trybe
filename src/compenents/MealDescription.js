import React, { useContext, /* , useState
  useEffect */ } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipesContext from '../contexts/RecipesContext';
// import '../styles/MealDescription.css';
import '../styles/Recomendations.css';
import ShareButton from './ShareButton';
import Recomendations from './Recomendations';
import FavoriteBtn from './FavoriteBtn';

function MealDescription({ recipe, recipeId }) {
  const { recomendations, setIsFavorite } = useContext(RecipesContext);
  const {
    idMeal, strArea, strMealThumb, strMeal, strCategory, strInstructions, strYoutube,
  } = recipe;
  // Estados fake, até poder pegar o estado do localStorage
  // const [isStarted, setIsStarted] = useState(false);

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

  return (
    <>
      <section className="detail-container">
        <img
          data-testid="recipe-photo"
          src={ strMealThumb }
          alt="comida"
          className="recomedation-img"
        />
        <h1 data-testid="recipe-title">{ strMeal }</h1>
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
        <h3 data-testid="recipe-category">{ strCategory }</h3>
        <h2>Ingredients</h2>
        { ingredients.map((ingredient, index) => (
          <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`- ${ingredient} - ${measures[index]}`}
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
      </section>
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
