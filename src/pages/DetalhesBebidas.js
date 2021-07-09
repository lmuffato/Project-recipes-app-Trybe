import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { fetchDrinkByID } from '../services/cocktailAPI';

import DetailsHeader from '../components/DetailsHeader';
import Text from '../components/Text';
import Paragraphs from '../components/Paragraphs';
import Button from '../components/Button';
import List from '../components/List';

export default function DetalhesBebidas() {
  const [recipe, setRecipe] = useState({});
  const [filterIngredient, setFilterIngredient] = useState([]);
  const { id } = useParams();

  const filterIngredients = (obj) => {
    const filter = Object.keys(obj)
      .filter((value) => value.includes('strIngredient'))
      .map((item) => (obj[item]));
    const excluir = null;
    let index = filter.indexOf(excluir);
    while (index >= 0) {
      filter.splice(index, 1);
      index = filter.indexOf(excluir);
    }
    return setFilterIngredient(filter);
  };

  useEffect(() => {
    async function updateData() {
      const result = await fetchDrinkByID(id);
      return setRecipe(result.drinks[0]);
    }
    updateData();
    filterIngredients(recipe);
  }, [id, recipe]);

  return (
    <div>
      <DetailsHeader
        recipe={ recipe }
        isDrink
      />
      <Text>
        Ingredients
      </Text>
      <List
        list={ filterIngredient }
      />
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
      <Button
        dataTestid="start-recipe-btn"
      >
        Iniciar Receita
      </Button>
    </div>
  );
}
