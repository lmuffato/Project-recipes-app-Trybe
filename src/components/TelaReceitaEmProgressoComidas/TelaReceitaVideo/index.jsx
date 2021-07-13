import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getIngredients from '../../../services/getIngredients';
import styles from './styles.module.scss';

function TelaReceitaVideo() {
  const [recipeVideo, setRecipeVideo] = useState([]);
  const { id } = useParams();
  const objeto = 'strYoutube';

  useEffect(() => {
    getIngredients(id, objeto, setRecipeVideo);
  },
  [id]);

  return (
    recipeVideo.map((video) => (
      <div id={ styles.video } key="video">
        Vídeo
        <iframe title={ video } />
      </div>
    ))

  );
}

export default TelaReceitaVideo;
