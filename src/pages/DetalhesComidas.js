import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { fetchFoodByID } from '../services/mealAPI';

import DetailsHeader from '../components/DetailsHeader';
import Text from '../components/Text';
import Paragraphs from '../components/Paragraphs';
import Button from '../components/Button';
import List from '../components/List';
import RenderVideo from '../components/RenderVideo';

export default function DetalhesComidas() {
  const [recipe, setRecipe] = useState({});
  const [filterIngredient, setFilterIngredient] = useState([]);
  const { id } = useParams();

  const filterIngredients = (obj) => {
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
  };

  useEffect(() => {
    async function updateData() {
      const result = await fetchFoodByID(id);
      return setRecipe(result.meals[0]);
    }
    updateData();
    filterIngredients(recipe);
  }, [id, recipe]);

  return (
    <div>
      <DetailsHeader
        recipe={ recipe }
        isFood
      />
      <Text>
        Ingredients
      </Text>
      <List
        list={ filterIngredient }
        datatestid="-ingredient-name-and-measure"
      />
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
      <Button
        dataTestid="start-recipe-btn"
      >
        Iniciar Receita
      </Button>
    </div>
  );
}
