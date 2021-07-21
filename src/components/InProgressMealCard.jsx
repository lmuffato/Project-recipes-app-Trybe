import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import shareIcon from '../images/shareIcon.svg';
import FavoriteButton from './FavoriteButton';
import IngredientsCheckBox from './IngredientsCheckBox';
import { setToLocalStorage } from '../services/localStorage';

const copy = require('clipboard-copy');

function InProgressMealCard() {
  const { currentMeal, setDoneRecipes, doneRecipes } = useContext(UserContext);
  const [copyLink, setCopyLink] = useState(false);
  const [showButtonFinished, setShowButtonFinished] = useState(true);
  const history = useHistory();
  const shareClick = () => {
    const URL = history.location.pathname.replace('/in-progress', '');
    copy(`http://localhost:3000${URL}`);
    setCopyLink(true);
  };

  const handleClick = () => {
    const date = new Date();
    setToLocalStorage('doneRecipes', [
      ...doneRecipes,
      {
        id: currentMeal.idMeal,
        type: 'comida',
        area: currentMeal.strArea,
        category: currentMeal.strCategory,
        alcoholicOrNot: '',
        name: currentMeal.strMeal,
        image: currentMeal.strMealThumb,
        doneDate: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
        tags: (currentMeal.strTags !== null) ? [currentMeal.strTags] : [],
      },
    ]);
    setDoneRecipes([
      ...doneRecipes,
      {
        id: currentMeal.idMeal,
        type: 'comida',
        area: currentMeal.strArea,
        category: currentMeal.strCategory,
        alcoholicOrNot: '',
        name: currentMeal.strMeal,
        image: currentMeal.strMealThumb,
        doneDate: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
        tags: (currentMeal.strTags !== null) ? [currentMeal.strTags] : [],
      },
    ]);
    history.push('/receitas-feitas');
  };

  return (
    <div className="detailMeal">
      <img
        data-testid="recipe-photo"
        src={ currentMeal.strMealThumb }
        alt="Current Meal"
        className="detailImage"
      />
      <div className="detailsTitle bodyPadding">
        <h3 data-testid="recipe-title">{currentMeal.strMeal}</h3>
        <div>
          <button
            data-testid="share-btn"
            type="button"
            onClick={ shareClick }
            className="shareButton"
          >
            <img src={ shareIcon } alt="compartilhar" />
          </button>
          {copyLink ? <span>Link copiado!</span> : null}
          <FavoriteButton type="comida" />
        </div>
      </div>
      <span
        data-testid="recipe-category"
        className="recipe-category bodyPadding"
      >
        { currentMeal.strCategory }
      </span>
      <div className="bodyPadding">
        <h4>Ingredients</h4>
        <IngredientsCheckBox
          currentMeal={ currentMeal }
          setShowButtonFinished={ setShowButtonFinished }
        />
        <h4>Instructions</h4>
        <p data-testid="instructions">{ currentMeal.strInstructions }</p>
      </div>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        className="start-recipe-btn"
        disabled={ showButtonFinished }
        onClick={ handleClick }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default InProgressMealCard;
