import React, { useEffect, useState, useCallback } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import { fetchDrinkByID } from '../services/cocktailAPI';
import { fetchFoods } from '../services/mealAPI';

import DetailsHeader from '../components/DetailsHeader';
import Text from '../components/Text';
import Paragraphs from '../components/Paragraphs';
import Button from '../components/Button';
import List from '../components/List';
import Carousel from '../components/Carousel';

export default function DetalhesBebidas() {
  const [recipe, setRecipe] = useState({});
  const [filterIngredient, setFilterIngredient] = useState([]);
  const [food, setFoods] = useState([]);
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

  const updateData = useCallback(async () => {
    const result = await fetchDrinkByID(id);
    return setRecipe(result.drinks[0]);
  }, [id]);

  const updateFoods = useCallback(async () => {
    const result = await fetchFoods();
    const arr = [];
    const six = 6;
    result.meals.map((item) => arr.push([item.strMealThumb, item.strMeal]));
    return setFoods(arr.slice(0, six));
  }, []);

  const handleClick = () => {
    history.push(`/bebidas/${id}/in-progress`);
  };

  useEffect(() => {
    updateData();
  }, [updateData]);

  useEffect(() => {
    filterIngredients();
  }, [filterIngredients]);

  useEffect(() => {
    updateFoods();
  }, [updateFoods]);

  return (
    <div>
      <DetailsHeader
        recipe={ recipe }
        isDrink
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
      <Text>
        Recomendadas
      </Text>
      { food.length > 0 && <Carousel data={ food } /> }
      <Button
        dataTestid="start-recipe-btn"
        onClick={ handleClick }
      >
        Iniciar Receita
      </Button>
    </div>
  );
}
