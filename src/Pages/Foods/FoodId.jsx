import React, { useEffect, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { fetchFoodForId } from '../../services/Data';

function FoodId() {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [foodForId, setFoodForId] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const index = 0;

  const handleClick = () => {
    setShouldRedirect(true);
  };

  useEffect(() => {
    fetchFoodForId(id)
      .then(({ meals }) => setFoodForId(meals));
  }, [id]);

  if (!foodForId.length) return <div>Loading...</div>;

  const {
    strMeal,
    strYoutube,
    strCategory,
    strInstructions,
    strMealThumb } = foodForId[0];

  if (shouldRedirect) return <Redirect to={ `/comidas/${id}/in-progress` } />;

  return (
    <div>
      <img
        src={ strMealThumb }
        alt="receita pronta"
        data-testid="recipe-photo"
      />
      <section>
        <p data-testid="recipe-title">{strMeal}</p>
        <p data-testid="recipe-category">{strCategory}</p>
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
        <p>Video</p>
        <iframe
          title="video"
          width="420"
          height="315"
          data-testid="video"
          src={ strYoutube }
        />
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

export default FoodId;
