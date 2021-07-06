import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeInfo from '../components/RecipeInfo/RecipeInfo';
import Button from '../components/Generics/Button';
import RecipeIngredients from '../components/RecipeIngredients/RecipeIngredients';
import Container from '../styles/recipeDetails';
import MealVideo from '../components/MealVideo/MealVideo';
import Carousel from '../components/Carousel/Carousel';

function RecipeDetails({ type }) {
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
      <h3>Instructions</h3>
      <div className="instructions">
        <p data-testid="instructions">
          { singleRecipe.strInstructions }
        </p>
      </div>
      { type === 'meals' ? (
        <MealVideo
          youTubeVideo={ youTubeVideo.substring(magicNumber) }
          title={ recipeName }
        />) : ''}
      <div className="carousel-container">
        <Carousel />
      </div>
      <Button data-testid="start-recipe-btn">
        Iniciar receita
      </Button>
    </Container>
  );
}

export default RecipeDetails;

RecipeDetails.propTypes = {
  recipe: PropTypes.shape(),
}.isRequired;
