import React, { useEffect, useState, useCallback } from 'react';

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

export default function DetalhesComidas() {
  const [recipe, setRecipe] = useState({});
  const [filterIngredient, setFilterIngredient] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const { id } = useParams();
  const history = useHistory();

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
    <div>
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
      {
        recipe.strYoutube
        && <RenderVideo
          dataTestid="video"
          src={ recipe.strYoutube.split('watch?v=').join('embed/') }
        />
      }
      <Text>
        Recomendadas
      </Text>
      { drinks.length > 0 && <Carousel data={ drinks } /> }
      <Button
        dataTestid="start-recipe-btn"
        onClick={ handleClick }
      >
        Iniciar Receita
      </Button>
    </div>
  );
}
