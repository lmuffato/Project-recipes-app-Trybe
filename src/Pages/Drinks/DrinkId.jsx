import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Redirect, Link } from 'react-router-dom';
import { fetchDrinkForId } from '../../services/Data';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import context from '../../store/Context';

function DrinkId() {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const index = 0;
  const style = {
    bottom: '0px',
    position: 'fixed',
  };

  const [drinkForId, setDrinkForId] = useState([]);
  const [hiddenValue, setHiddenValue] = useState(false);
  const [textBtn, setTextBtn] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { inProgressRecipes, setInProgressRecipes } = useContext(context);
  const { cocktails } = inProgressRecipes;
  const arrIngredients = Object.entries(drinkForId);
  const {
    strDrink,
    strAlcoholic,
    strInstructions,
    strDrinkThumb } = drinkForId;

  const setHidden = () => (
    localStorage.getItem('doneRecipes')
    && JSON.parse(localStorage.getItem('doneRecipes'))
      .filter(({ id: localStorageId }) => localStorageId === id)
      .length ? setHiddenValue(true) : setHiddenValue(false)
  );

  const getDrinksLocalStorage = () => (
    localStorage.getItem('inProgressRecipes')
    && Object.keys(JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails)
      .includes(id) ? setTextBtn('Continuar Receita') : setTextBtn('Iniciar Receita')
  );

  useEffect(() => {
    setHidden();
    getDrinksLocalStorage();
    fetchDrinkForId(id)
      .then((res) => {
        if (res.drinks) setDrinkForId(res.drinks[0]);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, cocktails]);

  const handleClick = () => {
    setShouldRedirect(true);
    setInProgressRecipes({
      cocktails: { ...cocktails, [id]: [] },
      meals: {},
    });
  };

  if (shouldRedirect) return <Redirect to={ `/bebidas/${id}/in-progress` } />;
  if (!drinkForId) return <div>Loading...</div>;

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
          {
            arrIngredients.filter(([key]) => key.includes('strIngredient'))
              .filter(([, value]) => value !== null)
              .map(([, value], i) => (
                <li
                  key={ i }
                  data-testid={ `${i}-ingredient-name-and-measure` }
                >
                  {
                    `${value} ${(drinkForId[`strMeasure${i + 1}`] === null) ? ''
                      : drinkForId[`strMeasure${i + 1}`]}`
                  }
                </li>
              ))
          }
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
      <Link to="/bebidas">Voltar</Link>
      <button
        type="button"
        onClick={ handleClick }
        data-testid="start-recipe-btn"
        style={ style }
        hidden={ hiddenValue }
      >
        {textBtn}
      </button>
    </div>
  );
}

export default DrinkId;
