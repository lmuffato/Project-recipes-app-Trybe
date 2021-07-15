import React, { useState, useEffect } from 'react';
// import ReactPlayer from 'react-player'; // https://dev.to/marcelomatosdev/react-adding-a-video-player-to-play-youtube-videos-in-your-project-30p
import { Link, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { foodById } from '../services/apiRequests';
import DrinksRecomends from './componentsDetails/DrinksRecomends';
import './DetailsScreen.css';

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

  const retObj = Object.entries(foodDetails);
  const listIngredients = retObj.filter((meal) => (
    meal[0].includes('Ingredient') && meal[1]
  ));
  const filterAlcoohol = retObj.filter((meal) => {
    const noAlcool = meal[1] !== ' ' && meal[1] !== null;
    return meal[0].includes('Measure') && noAlcool;
  });

  return (
    <div>
      <img
        src={ foodDetails.strMealThumb }
        alt="imagem da comida"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ foodDetails.strMeal }</h1>
      <button type="button" data-testid="share-btn">
        <img src={ shareIcon } alt="compartilhar" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="favoritar" />
      </button>
      <h2 data-testid="recipe-category">{ foodDetails.strCategory }</h2>
      <h3>Ingredientes:</h3>
      <ul>
        {listIngredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {filterAlcoohol[index] ? (
              `${ingredient[1]} - ${filterAlcoohol[index][1]}`
            ) : (ingredient[1])}
          </li>
        ))}
      </ul>
      <h4>Instructions: </h4>
      <h2 data-testid="instructions">{ foodDetails.strInstructions }</h2>
      {/* <ReactPlayer
        data-testid="video"
        url={ foodDetails.strYoutube }
      /> */}
      <DrinksRecomends />
      <Link to={ `/comidas/${idMeal}/in-progress` }>
        <button type="button" data-testid="start-recipe-btn" className="playRecipe">
          Iniciar Receita
        </button>
      </Link>
    </div>
  );
}
