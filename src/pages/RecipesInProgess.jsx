import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeInfo from '../components/RecipeInfo/RecipeInfo';
import Button from '../components/Generics/Button';
import
RecipeIngredientsInProgress from
  '../components/RecipesIngredientsInProgress/RecipesIngredientsInProgress';
import Container from '../styles/recipeDetails';
import RecipesInProgressContextProvider from '../context/RecipesInProgressContext';

function RecipesInProgress({ type }) {
  const { id } = useParams();
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
      // console.log(data[type][0]);
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

  const recipeName = singleRecipe.strMeal || singleRecipe.strDrink;
  const recipeThumb = singleRecipe.strMealThumb || singleRecipe.strDrinkThumb;
  const recipeCategory = singleRecipe.strCategory;
  const isAlchooholic = singleRecipe.strAlcoholic || '';
  const recipeId = singleRecipe.idMeal || '';
  const drinkId = singleRecipe.idDrink || '';

  return (
    <RecipesInProgressContextProvider>
      <Container>
        <RecipeInfo
          recipeName={ recipeName }
          recipeThumb={ recipeThumb }
        >
          { type === 'drinks'
            ? (<h3 data-testid="recipe-category">{isAlchooholic}</h3>)
            : (
              <h3 data-testid="recipe-category">{recipeCategory}</h3>)}
        </RecipeInfo>
        <h3>Ingredientes</h3>
        <div className="ingredients-list">
          <RecipeIngredientsInProgress
            recipe={ singleRecipe }
            idMeal={ recipeId }
            idDrink={ drinkId }
            type={ type }
          />
        </div>
        <h3>Instructions</h3>
        <div className="instructions">
          <p data-testid="instructions">
            { singleRecipe.strInstructions }
          </p>
        </div>
        <Button
          data-testid="finish-recipe-btn"
          disabled
        >
          Finalizar receita
        </Button>
      </Container>
    </RecipesInProgressContextProvider>
  );
}

export default RecipesInProgress;

// RecipeDetails.defaultProps = {
//   url: '',
// };

RecipesInProgress.propTypes = {
  type: PropTypes.string.isRequired,
  // url: PropTypes.string,
};
