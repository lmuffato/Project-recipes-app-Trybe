import React, { useEffect, useState, useCallback } from 'react';

import { useParams } from 'react-router-dom';

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

  const filterIngredients = useCallback((obj = recipe) => {
    const filter = Object.keys(obj)
      .filter((value) => value.includes('strIngredient'))
      .map((item) => (obj[item]));
    const excluir = '';
    let index = filter.indexOf(excluir);
    while (index >= 0) {
      filter.splice(index, 1);
      index = filter.indexOf(excluir);
    }
    return setFilterIngredient(filter);
  }, [recipe]);

  const updateData = useCallback(async () => {
    const result = await fetchFoodByID(id);
    return setRecipe(result.meals[0]);
  }, [id]);

  const updateDrinks = useCallback(async () => {
    const result = await fetchCocktails();
    const arr = [];
    const six = 6;
    result.drinks.map((item) => arr.push(item.strDrinkThumb));
    return setDrinks(arr.slice(0, six));
  }, []);

  useEffect(() => {
    updateData();
  }, [updateData]);

  useEffect(() => {
    filterIngredients();
  }, [filterIngredients]);

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
      >
        Iniciar Receita
      </Button>
    </div>
  );
}
