import React, { useEffect, useState, useCallback, useContext } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import { fetchFoodByID } from '../services/mealAPI';
import { fetchCocktails } from '../services/cocktailAPI';

import DetailsHeader from '../components/DetailsHeader';
import Text from '../components/Text';
import Paragraphs from '../components/Paragraphs';
import Button from '../components/Button';
import List from '../components/List';
import RenderVideo from '../components/RenderVideo';
import Carousel from '../components/Carousel';
import '../style/DetalhesComidas.css';
import FoodContext from '../contexts/FoodContext';

export default function DetalhesComidas() {
  const [recipe, setRecipe] = useState({});
  const [filterIngredient, setFilterIngredient] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [isDone, setIsDone] = useState();
  const [isInProgress, setIsInProgress] = useState();
  const { id } = useParams();
  const history = useHistory();
  const context = useContext(FoodContext);
  const { color: { colorDiv } } = context;

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      setIsDone(doneRecipes.map((done) => done.id).includes(id));
    }
  }, [id]);

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes')) {
      const { meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));
      setIsInProgress(Object.keys(meals).includes(id));
    }
  }, [id]);

  const filterIngredients = useCallback((obj = recipe) => {
    const filterKeys = Object.keys(obj)
      .filter((value) => value.includes('strIngredient')
        && obj[value] !== '' && obj[value] !== null)
      .map((item) => (obj[item]));
    const ingredientsMeasures = filterKeys
      .map((key, index) => [`${key} - `, obj[`strMeasure${index + 1}`]]);
    return setFilterIngredient(ingredientsMeasures);
  }, [recipe]);

  const updateFood = useCallback(async () => {
    const result = await fetchFoodByID(id);
    return setRecipe(result.meals[0]);
  }, [id]);

  const updateDrinks = useCallback(async () => {
    const result = await fetchCocktails();
    const arr = [];
    const six = 6;
    result.drinks.map((item) => arr.push([item.strDrinkThumb, item.strDrink]));
    return setDrinks(arr.slice(0, six));
  }, []);

  const handleClick = () => {
    history.push(`/comidas/${id}/in-progress`);
  };

  useEffect(() => {
    filterIngredients();
  }, [filterIngredients]);

  useEffect(() => {
    updateFood();
  }, [updateFood]);

  useEffect(() => {
    updateDrinks();
  }, [updateDrinks]);

  return (
    <>
      <div className="details-main">
        <DetailsHeader
          recipe={ recipe }
          isFood
        />

        <Text>
          Ingredients
        </Text>
        { filterIngredient.length > 0
          && <List
            dataTestid="-ingredient-name-and-measure"
            list={ filterIngredient }
          /> }
        <Text>
          Instructions
        </Text>
        {
          recipe.strInstructions
          && <Paragraphs dataTestid="instructions">{ recipe.strInstructions }</Paragraphs>
        }
        <Text>Video</Text>
        <br />
        {
          recipe.strYoutube
          && <RenderVideo
            dataTestid="video"
            src={ recipe.strYoutube.split('watch?v=').join('embed/') }
          />
        }
        <br />
        <Text>
          Recommended
        </Text>
      </div>
      <div
        className="recipe-button-bottom"
        style={ { backgroundColor: colorDiv } }
      >
        { drinks.length > 0 && <Carousel data={ drinks } /> }
        <br />
        <br />
        {!isDone && (
          <Button
            dataTestid="start-recipe-btn"
            onClick={ handleClick }
          >
            {isInProgress ? 'Continue Recipe' : 'Start Recipe'}
          </Button>
        )}
      </div>
      <br />
      <br />
    </>
  );
}
