import React, { useContext /* , useState */ } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipesContext from '../contexts/RecipesContext';
// import MealCards from './MealCards';
// import '../styles/MealDescription.css';
import '../styles/Recomendations.css';
import Recomendations from './Recomendations';
import FavoriteBtn from './FavoriteBtn';
import ShareButtons from './ShareButtons';

function DrinkDescription({ recipe, recipeId }) {
  const { recomendations, setIsFavorite } = useContext(RecipesContext);
  const {
    idDrink, strArea, strDrinkThumb, strDrink, strCategory, strInstructions, strAlcoholic,
  } = recipe;
  // Estados fake, até poder pegar o estado do localStorage
  // const [isStarted, setIsStarted] = useState(false);

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
        <img data-testid="recipe-photo" src={ strDrinkThumb } alt="comida" />
        <h1 data-testid="recipe-title">{ strDrink }</h1>
        <ShareButtons idRecipe={ `comidas/${idDrink}` } />
        <FavoriteBtn
          id={ idDrink }
          type="cocktail"
          area={ strArea }
          category={ strCategory }
          alcoholicOrNot={ null }
          name={ strDrink }
          image={ strDrinkThumb }
        />
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
      <section>
        <section className="recipes">
          { recomendations.map(({ idMeal, strMealThumb, strMeal }, index) => (
            <Recomendations
              index={ index }
              key={ idMeal }
              id={ idMeal }
              thumb={ strMealThumb }
              pathname={ `/comidas/${idMeal}` }
              recipeName={ strMeal }
            />
          ))}
        </section>
      </section>
      <Link to={ `/bebidas/${recipeId}/in-progress` }>
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
