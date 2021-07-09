import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDrinksById } from '../../services/getDrinks';

function DrinksDetails() {
  const [drinksFromId, setDrinksFromId] = useState([]);

  const location = useLocation();
  const url = location.pathname;
  const URL_ID = url.substring(url.lastIndexOf('/') + 1);

  useEffect(() => {
    getDrinksById(URL_ID)
      .then((drinks) => setDrinksFromId(drinks));
  }, []);

  const renderDetail = () => (
    drinksFromId.map((info, index) => {
      const {
        strDrinkThumb,
        strDrink,
        strCategory,
        strInstructions,
      } = info;
      return (
        <div key={ index }>
          <img
            data-testid="recipe-photo"
            src={ strDrinkThumb }
            alt="recipe"
            width="300"
          />
          <h2 data-testid="recipe-title">{ strDrink }</h2>
          <button type="button" onClick="">
            <img src="" alt="share button" data-testid="share-btn" />
          </button>
          <button type="button" onClick="">
            <img src="" alt="favorite button" data-testid="favorite-btn" />
          </button>
          <p data-testid="recipe-category">{ strCategory }</p>
          <ul>
            <li data-testid={ `${index}-ingredient-name-and-measure` }>Ingredientes</li>
          </ul>
          <h2>Instruções</h2>
          <p data-testid="instructions">{ strInstructions }</p>
          <ul><li data-testid={ `${index}-recomendation-card` }>teste</li></ul>
          <button
            data-testid="start-recipe-btn"
            type="button"
          >
            Iniciar Receita
          </button>
        </div>
      );
    })
  );
  return (
    <div>
      { renderDetail() }
    </div>
  );
}

export default DrinksDetails;
