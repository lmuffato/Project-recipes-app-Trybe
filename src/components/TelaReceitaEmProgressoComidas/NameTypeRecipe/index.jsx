import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ColoredLine from '../ColoredLine';
import RecipeType from './recipeType';
import getIngredients from '../../../services/getIngredients';
import styles from './styles.module.scss';

function NameTypeRecipe() {
  const [recipeName, setRecipeName] = useState([]);
  const { id } = useParams();
  const objeto = 'strMeal';

  useEffect(() => {
    getIngredients(id, objeto, setRecipeName);
  },
  [id]);

  return (
    <>
      {recipeName.filter((name) => (
        <div id={ styles.titlecontainer } data-testid="recipe-title" key="nameRecipe">
          {name}
        </div>
      ))[0]}
      <ColoredLine color="#EE9EE1" />
      <RecipeType />
    </>

  );
}

export default NameTypeRecipe;
