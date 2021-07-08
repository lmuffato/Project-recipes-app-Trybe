import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player'; // https://dev.to/marcelomatosdev/react-adding-a-video-player-to-play-youtube-videos-in-your-project-30p
import { useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { foodById } from '../services/apiRequests';
import listOfIngredients from './componentsDetails/ListOfIngredients';

export default function RecipeCardDetailFood() {
  const [foodDetails, setFoodDetails] = useState({});
  const { idMeal } = useParams();

  useEffect(() => {
    const fetchFood = async () => {
      const food = await foodById(idMeal);
      setFoodDetails(food);
    };

    fetchFood();
  }, [idMeal]);

  return (
    <div>
      <img
        src={ foodDetails.strMealThumb }
        alt="imagem da comida"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ foodDetails.strFood }</h1>
      <button type="button" data-testid="share-btn">
        <img src={ shareIcon } alt="compartilhar" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="favoritar" />
      </button>
      <h2 data-testid="recipe-category">{ foodDetails.strCategory }</h2>
      <h3>{ listOfIngredients }</h3>
      <h3 data-testid="instructions">{ foodDetails.strInstructions }</h3>
      <ReactPlayer
        data-testid="video"
        height="300"
        width="300"
        url={ foodDetails.strYoutube }
      />
      {/* <h4 data-testid={ `${index}-recomendation-card` }>RecommendedFood</h4> */}
      <button type="button" data-testid="start-recipe-btn">
        PlayReceita (FALTAAQUI ONCLICK PARA MUDAR DE TELA!!!)
      </button>
    </div>
  );
}
