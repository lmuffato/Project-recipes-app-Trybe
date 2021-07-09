import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Redirect, Link } from 'react-router-dom';
import { fetchFoodForId } from '../../services/Data';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import context from '../../store/Context';

const copy = require('clipboard-copy');

const setHidden = (setHiddenValue, id) => (
  (JSON.parse(localStorage.getItem('doneRecipes')) || [])
    .filter(({ id: localStorageId }) => localStorageId === id)
    .length ? setHiddenValue(true) : setHiddenValue(false)
);

const getFoodsLocalStorage = (setTextBtn, id) => (
  localStorage.getItem('inProgressRecipes')
      && Object.keys(JSON.parse(localStorage.getItem('inProgressRecipes')).meals)
        .includes(id) ? setTextBtn('Continuar Receita') : setTextBtn('Iniciar Receita')
);

const getFoodsFavorites = (setImgFavorite, id) => (
  (JSON.parse(localStorage.getItem('favoriteRecipes')) || [])
    .filter(({ id: localStorageId }) => localStorageId === id)
    .length ? setImgFavorite(blackHeartIcon) : setImgFavorite(whiteHeartIcon)
);

function FoodId() {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const route = location.pathname;
  const stopCart = 5;
  const style = {
    bottom: '0px',
    position: 'fixed',
  };

  const [foodForId, setFoodForId] = useState([]);
  const [hiddenValue, setHiddenValue] = useState(false);
  const [textBtn, setTextBtn] = useState('');
  const [textLink, setTextLink] = useState('');
  const [imgFavorite, setImgFavorite] = useState(whiteHeartIcon);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { inProgressRecipes, setInProgressRecipes, drinks } = useContext(context);
  const { meals } = inProgressRecipes;
  const arrIngredients = Object.entries(foodForId);
  const {
    strMeal,
    strYoutube,
    strCategory,
    strInstructions,
    strMealThumb } = foodForId;

  useEffect(() => {
    getFoodsLocalStorage(setTextBtn, id);
    setHidden(setHiddenValue, id);
    getFoodsFavorites(setImgFavorite, id);
    fetchFoodForId(id)
      .then((res) => {
        if (res.meals) setFoodForId(res.meals[0]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, meals]);

  const handleClick = () => {
    setShouldRedirect(true);
    setInProgressRecipes({
      cocktails: {},
      meals: { ...meals, [id]: [] },
    });
  };

  const copyURL = () => {
    const SEC = 3000;
    copy(`http://localhost:3000${route}`);
    if (textLink === '') {
      setTextLink('Link copiado!');
      setTimeout(() => {
        setTextLink('');
      }, SEC);
    }
  };

  if (shouldRedirect) return <Redirect to={ `/comidas/${id}/in-progress` } />;
  if (!foodForId) return <div>Loading...</div>;

  return (
    <div>
      <img
        src={ strMealThumb }
        alt="receita pronta"
        data-testid="recipe-photo"
      />
      <span>{textLink}</span>
      <section>
        <p data-testid="recipe-title">{strMeal}</p>
        <p data-testid="recipe-category">{strCategory}</p>
        <button
          type="button"
          onClick={ copyURL }
        >
          <img data-testid="share-btn" src={ shareIcon } alt="share-icon" />
        </button>
        <button
          type="button"
          src={ imgFavorite }
          data-testid="favorite-btn"
        >
          <img src={ imgFavorite } alt="favorite icon" />
        </button>
      </section>
      <section>
        <p>Ingredients</p>
        <ul>
          {
            arrIngredients.filter(([key]) => key.includes('strIngredient'))
              .filter(([, value]) => value !== null && value !== '')
              .map(([, value], i) => (
                <li
                  key={ i }
                  data-testid={ `${i}-ingredient-name-and-measure` }
                >
                  {
                    `${value} ${(foodForId[`strMeasure${i + 1}`] === null) ? ''
                      : foodForId[`strMeasure${i + 1}`]}`
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
        <p>Video</p>
        <iframe
          title="video"
          width="420"
          height="315"
          data-testid="video"
          src={ `https://www.youtube.com/embed/${(strYoutube || '').split('=')[1]}` }
        />
      </section>
      <section>
        <p>Recomendadas</p>
        <div className="recomendation-container">
          {
            drinks.filter((_, index) => index <= stopCart)
              .map((drink, index) => (
                <div
                  className="recomendation-card"
                  key={ drink.idDrink }
                  data-testid={ `${index}-recomendation-card` }
                >
                  <img
                    src={ drink.strDrinkThumb }
                    alt="Receita pronta"
                    data-testid={ `${index}-card-img` }
                  />
                  <p data-testid={ `${index}-recomendation-title` }>{drink.strDrink}</p>
                </div>
              ))
          }
        </div>
      </section>
      <Link to="/comidas">Voltar</Link>
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

export default FoodId;
