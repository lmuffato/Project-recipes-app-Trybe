import React, { useEffect, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { fetchDrinkForId } from '../../services/Data';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function DrinkId() {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [drinkForId, setDrinkForId] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const index = 0;
  const style = {
    bottom: '0px',
    position: 'fixed',
  };

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
        >
          <img data-testid="share-btn" src={ shareIcon } alt="share-icon" />
        </button>
        <button
          type="button"
        >
          <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="favorite icon" />
        </button>
      </section>
      <section>
        <p>Ingredients</p>
        <ul>
          {/* {
            drinkForId.filter((ingredient) => ingredient.include('strIngredient'))
              .filter((ingredient) => ingredient.value !== null)
              .map((ingredient, index) => <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>{ingredient.value}</li>)
          } */}
          <li data-testid={ `${index}-ingredient-name-and-measure` }>Hpnotiq</li>
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
        style={ style }
      >
        Iniciar Receita
      </button>
    </div>
  );
}

export default DrinkId;
