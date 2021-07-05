import React, { useState, useCallback, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeInfo from '../components/RecipeInfo/RecipeInfo';
import Button from '../components/Generics/Button';
import RecipeIngredients from '../components/RecipeIngredients/RecipeIngredients';

function RecipeDetails() {
  const location = useLocation();
  const { id } = useParams();
  // const { match } = useParams();
  // const { id } = match;
  const { state } = location;
  const { type } = state;
  const endpointMeals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const endpointDrinks = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const [fetchRecipeURL, setFetchRecipeURL] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [singleRecipe, setRecipe] = useState({});

  const handleFetchIngredients = useCallback(() => {
    if (type === 'meals') {
      setFetchRecipeURL(endpointMeals);
    }
    if (type === 'drinks') {
      setFetchRecipeURL(endpointDrinks);
    }
  }, [endpointDrinks, endpointMeals, type]);

  const handleFetch = useCallback(async (url) => {
    try {
      const request = await fetch(url);
      const data = await request.json();
      setRecipe(data[type][0]);
      console.log(data[type][0]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [type]);

  useEffect(() => {
    handleFetchIngredients();
    handleFetch(fetchRecipeURL);
  }, [fetchRecipeURL, handleFetch, handleFetchIngredients]);

  if (isLoading) {
    return 'Loading';
  }

  // console.log(recipe);
  // incluir fetch à API de cada receita
  const recipeName = singleRecipe.strMeal || singleRecipe.strDrink;
  // const recipeId = recipe.idMeal || recipe.idDrink;
  const recipeThumb = singleRecipe.strMealThumb || singleRecipe.strDrinkThumb;
  const recipeCategory = singleRecipe.strCategory;
  const isAlchooholic = singleRecipe.strAlcoholic || '';

  return (
    <div className="recipe-details-page">
      <RecipeInfo
        recipeName={ recipeName }
        recipeThumb={ recipeThumb }
      >
        { type === 'drinks' ? (<h3 data-testid="recipe-category">{isAlchooholic}</h3>) : (
          <h3 data-testid="recipe-category">{recipeCategory}</h3>)}
      </RecipeInfo>

      <div>
        <RecipeIngredients recipe={ singleRecipe } type={ type } />
      </div>
      {/* <RecipeIngredients id={ recipeId } type={ type } /> */}
      <div className="instructions">
        <h5>Instructions</h5>
        <p data-testid="instructions">
          { singleRecipe.strInstructions }
        </p>
        <div data-testid="video">Video aqui</div>
      </div>
      <Button data-testid="start-recipe-btn">
        Iniciar receita
      </Button>

    </div>
  );
}

// fazer um if com o retorno do fetch da receita
// pegar todas as chaves que iniciam com os ingredientes, concatenar
// usar o trim() num if para deixar de fora os valores que são strings vazias
export default RecipeDetails;

RecipeDetails.propTypes = {
  recipe: PropTypes.shape(),
}.isRequired;
