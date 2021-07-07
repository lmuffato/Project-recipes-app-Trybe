import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import '../Style/PagesDetails.css';
import getIngredientList from '../services/getIngredients';

function DetalhesComidas() {
  const [recipes, setRecipes] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [recomendation, setRecomendation] = useState([]);

  const { location: { pathname } } = useHistory();
  const splitPathName = pathname.split('/');
  const idFood = splitPathName[2];

  const fetchMealAPI = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idFood}`);
    const recipe = await response.json();
    setRecipes(recipe.meals[0]);
  };

  const fetchRecomendation = async () => {
    const MAX_RECOMENDATION = 6;
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const json = await response.json();
    const recommend = json.drinks;
    setRecomendation(recommend.slice(0, MAX_RECOMENDATION));
  };

  useEffect(() => {
    fetchMealAPI();
    fetchRecomendation();
  }, []);

  useEffect(() => {
    setIngredients(getIngredientList(recipes));
  }, [recipes]);

  const { strMealThumb, strMeal, strCategory, strYoutube, strInstructions } = recipes;

  let youTubeAdress = '';
  if (strYoutube) {
    youTubeAdress = strYoutube.split('=');
  }

  return (
    <div>
      <img data-testid="recipe-photo" width="350" src={ strMealThumb } alt="" />
      <h2 data-testid="recipe-title">{strMeal}</h2>
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">{strCategory}</p>
      <ul>
        <h1>Ingredientes</h1>
        { ingredients.map(({ ingredient, amount }, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingredient} - ${amount}`}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{strInstructions}</p>
      <iframe
        data-testid="video"
        src={ `https://www.youtube.com/embed/${youTubeAdress[1]}` }
        title="video"
      />
      <div className="recomentadion-container">
        {recomendation.map(({ strDrinkThumb, strDrink, strAlcoholic }, index) => (
          <div
            className="recommended-card"
            key={ strDrink }
            data-testid={ `${index}-recomendation-card` }
          >
            <img src={ strDrinkThumb } alt={ strDrink } />
            <p>{ strAlcoholic }</p>
            <p data-testid={ `${index}-recomendation-title` }>{ strDrink }</p>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="details-button"
        data-testid="start-recipe-btn"
      >
        Iniciar receita
      </button>
    </div>
  );
}

export default DetalhesComidas;
