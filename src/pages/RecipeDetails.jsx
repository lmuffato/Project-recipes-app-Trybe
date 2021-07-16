import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeInfo from '../components/RecipeInfo/RecipeInfo';
import InitOrContinueButton
  from '../components/InitOrContinueRecipeButton/InitOrContinueButton';
import RecipeIngredients from '../components/RecipeIngredients/RecipeIngredients';
import RecipeInstructions from '../components/RecipeInstructions/RecipeInstructions';
import Container from '../styles/recipeDetails';
import MealVideo from '../components/MealVideo/MealVideo';
import Carousel from '../components/Carousel/Carousel';
import useDetailsProvider from '../hooks/useDetailsProvider';

const endpointRecipes = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const endpointCocktails = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function RecipeDetails({ type }) {
  const { id } = useParams();
  const endpointMeal = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const endpointDrink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const [singleRecipe, setRecipe] = useState({});
  const { handleFetch, isLoading,
    recipeData, recommendations, fetchMealRecipes } = useDetailsProvider();

  useEffect(() => {
    const getRecipesAndRecommendations = () => {
      if (type === 'meals') {
        fetchMealRecipes(endpointCocktails, type);
        return handleFetch(endpointMeal, type);
      }
      fetchMealRecipes(endpointRecipes, type);
      return handleFetch(endpointDrink, type);
    };
    getRecipesAndRecommendations();
  }, [endpointDrink, endpointMeal, fetchMealRecipes, handleFetch, type]);

  useEffect(() => {
    let cancel = false;
    const settingUp = () => {
      if (cancel) return;
      setRecipe(recipeData);
    };
    settingUp();
    return () => {
      cancel = true;
    };
  }, [recipeData, recommendations, type]);

  if (isLoading) {
    return 'Loading';
  }

  const isAlchooholic = singleRecipe.strAlcoholic || '';
  const magicNumber = 32;
  const youTubeVideo = singleRecipe.strYoutube || '';
  const recipeMealName = singleRecipe.strMeal;
  const recipeThumb = singleRecipe.strMealThumb || singleRecipe.strDrinkThumb;
  const recipeCategory = singleRecipe.strCategory;
  const recipeName = type === 'meals' ? singleRecipe.strMeal : singleRecipe.strDrink;

  const renderCategory = type === 'drinks' ? (isAlchooholic) : (recipeCategory);

  return (
    <Container>
      <RecipeInfo
        recipeName={ recipeName }
        recipeThumb={ recipeThumb }
        type={ type }
        recipe={ singleRecipe }
        recipeCategory={ renderCategory }
      />
      <h3>Ingredientes</h3>
      <div className="ingredients-list">
        <RecipeIngredients recipe={ singleRecipe } />
      </div>
      <RecipeInstructions singleRecipe={ singleRecipe } />
      { type === 'meals' ? (
        <MealVideo
          youTubeVideo={ youTubeVideo.substring(magicNumber) }
          title={ recipeMealName }
        />) : ''}
      <div className="title-wrapper"><h3>Recomendadas</h3></div>
      <Carousel
        recipeRecommendations={ recommendations }
        type={ type }
      />
      <InitOrContinueButton type={ type } />
    </Container>
  );
}

export default RecipeDetails;

RecipeDetails.propTypes = {
  type: PropTypes.string.isRequired,
};
