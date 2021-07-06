import React, { useEffect, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { fetchDrinkForId } from '../../services/Data';

function DrinkId() {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [drinkForId, setDrinkForId] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const index = 0;

  const handleClick = () => {
    setShouldRedirect(true);
  };

  useEffect(() => {
    fetchDrinkForId(id)
      .then((res) => {
        if (res.drinks) setDrinkForId(res.drinks[0]);
      });
  }, [id]);

  if (!drinkForId) return <div>Loading...</div>;

  const {
    strDrink,
    strAlcoholic,
    strInstructions,
    strDrinkThumb } = drinkForId;

  if (shouldRedirect) return <Redirect to={ `/bebidas/${id}/in-progress` } />;

  return (
    <div>
      <img
        src={ strDrinkThumb }
        alt="receita pronta"
        data-testid="recipe-photo"
      />
      <section>
        <p data-testid="recipe-title">{strDrink}</p>
        <p data-testid="recipe-category">{strAlcoholic}</p>
        <button
          type="button"
          data-testid="share-btn"
        >
          Compartilhar
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favorito
        </button>
      </section>
      <section>
        <p>Ingredients</p>
        <ul>
          <li data-testid={ `${index}-ingredient-name-and-measure` } />
        </ul>
      </section>
      <section>
        <p>Instructions</p>
        <p data-testid="instructions">{strInstructions}</p>
      </section>
      <section>
        <p>Recomendadas</p>
        <div data-testid={ `${index}-recomendation-card` } />
      </section>
      <button
        type="button"
        onClick={ handleClick }
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </div>
  );
}

export default DrinkId;
