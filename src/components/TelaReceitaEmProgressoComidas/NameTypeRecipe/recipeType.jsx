import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getIngredients from '../../../services/getIngredients';

function RecipeType() {
  const [recipeType, setRecipeType] = useState([]);
  const { id } = useParams();
  const objeto = 'strCategory';

  useEffect(() => {
    getIngredients(id, objeto, setRecipeType);
  },
  [id]);

  return (
    recipeType.map((type) => (
      <p key="type">{type}</p>
    ))
  );
}

export default RecipeType;
