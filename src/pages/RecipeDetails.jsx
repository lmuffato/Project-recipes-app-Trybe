import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeInfo from '../components/RecipeInfo/RecipeInfo';
import Button from '../components/Generics/Button';
import RecipeIngredients from '../components/RecipeIngredients/RecipeIngredients';
import RecipeInstructions from '../components/RecipeInstructions/RecipeInstructions';
import Container from '../styles/recipeDetails';
import MealVideo from '../components/MealVideo/MealVideo';
import Carousel from '../components/Carousel/Carousel';
import useDetailsProvider from '../hooks/useDetailsProvider';

function RecipeDetails({ type }) {
  const { id } = useParams();
  const endpointMeal = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const endpointDrink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const endpointRecipes = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const endpointCocktails = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  // const [fetchRecipeURL, setFetchRecipeURL] = useState('');
  const [carouselRecommendations, setRecomendations] = useState([]);
  const currRecomendation = type === 'meals' ? 'drinks' : 'meals';
  const [singleRecipe, setRecipe] = useState({});
  const { handleFetch,
    isLoading, recipeData,
    recommendations, fetchMealRecipes, currentImage } = useDetailsProvider();

  useEffect(() => {
    const getRecipesAndRecommendations = async () => {
      if (type === 'meals') {
        await fetchMealRecipes(endpointCocktails, type);
        await handleFetch(endpointMeal, type);
      }
      await fetchMealRecipes(endpointRecipes, type);
      await handleFetch(endpointDrink, type);
    };
    getRecipesAndRecommendations();
  }, [endpointDrink,
    endpointMeal, fetchMealRecipes, handleFetch, type]);

  useEffect(() => {
    let cancel = false;
    const settingUp = () => {
      if (cancel) return;
      setRecipe(recipeData);
      setRecomendations(recommendations);
    };
    settingUp();
    return () => {
      cancel = true;
    };
  }, [recipeData, recommendations]);

  if (isLoading) {
    return 'Loading';
  }

  const recipeName = singleRecipe.strMeal || singleRecipe.strDrink;
  const recipeThumb = singleRecipe.strMealThumb || singleRecipe.strDrinkThumb;
  const recipeCategory = singleRecipe.strCategory;
  const isAlchooholic = singleRecipe.strAlcoholic || '';
  const magicNumber = 32;
  const youTubeVideo = singleRecipe.strYoutube || '';

  return (
    <Container>
      <RecipeInfo
        recipeName={ recipeName }
        recipeThumb={ recipeThumb }
      >
        { type === 'drinks' ? (<h3 data-testid="recipe-category">{isAlchooholic}</h3>) : (
          <h3 data-testid="recipe-category">{recipeCategory}</h3>)}
      </RecipeInfo>
      <h3>Ingredientes</h3>
      <div className="ingredients-list">
        <RecipeIngredients recipe={ singleRecipe } />
      </div>
      <RecipeInstructions singleRecipe={ singleRecipe } />
      { type === 'meals' ? (
        <MealVideo
          youTubeVideo={ youTubeVideo.substring(magicNumber) }
          title={ recipeName }
        />) : ''}
      <Carousel
        recipeRecommendations={ carouselRecommendations }
        currentImg={ currentImage }
        currRecommendation={ currRecomendation }
        type={ type }
      />
      <Button data-testid="start-recipe-btn">
        Iniciar receita
      </Button>
    </Container>
  );
}

export default RecipeDetails;

RecipeDetails.propTypes = {
  type: PropTypes.string.isRequired,
};
