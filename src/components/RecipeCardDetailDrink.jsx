import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { drinkById } from '../services/apiRequests';
import listOfIngredients from './componentsDetails/ListOfIngredients';

export default function RecipeCardDetailDrink() {
  const [drinkDetails, setDrinkDetails] = useState({});
  const { idDrink } = useParams();

  useEffect(() => {
    const fetchDrink = async () => {
      const drink = await drinkById(idDrink);
      setDrinkDetails(drink);
    };

    fetchDrink();
  }, [idDrink]);

  return (
    <div>
      <img
        src={ drinkDetails.strDrinkThumb }
        alt="imagem da bebida"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ drinkDetails.strDrink }</h1>
      <button type="button" data-testid="share-btn">
        <img src={ shareIcon } alt="compartilhar" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="favoritar" />
      </button>
      <h2 data-testid="recipe-category">{ drinkDetails.strCategory }</h2>
      <h3>{ listOfIngredients }</h3>
      <h3 data-testid="instructions">{ drinkDetails.strInstructions }</h3>
      {/* <h4 data-testid={ `${index}-recomendation-card` }>Recommended Drinks</h4> */}
      <button type="button" data-testid="start-recipe-btn">
        PlayReceita (FALTAAQUI ONCLICK PARA MUDAR DE TELA!!!)
      </button>
    </div>
  );
}
