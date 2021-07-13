import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getIngredients from '../../../services/getIngredients';
import styles from './styles.module.scss';

function FoodImage() {
  const [recipeImg, setRecipeImg] = useState([]);
  const { id } = useParams();
  const objeto = 'strMealThumb';

  useEffect(() => {
    getIngredients(id, objeto, setRecipeImg);
  },
  [id]);
  return (
    recipeImg.map((img) => (<img
      className={ styles.foodpicture }
      src={ img }
      alt="foodPicture"
      key="food-img"
    />))
  );
}

export default FoodImage;
