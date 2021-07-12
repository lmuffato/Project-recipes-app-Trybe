import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Redirect, Link } from 'react-router-dom';
import { fetchDrinkForId } from '../../services/Data';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import '../../Styles/Recomendation.css';
import context from '../../store/Context';

const copy = require('clipboard-copy');

const setHidden = (setHiddenValue, id) => (
  localStorage.getItem('doneRecipes')
  && JSON.parse(localStorage.getItem('doneRecipes'))
    .filter(({ id: localStorageId }) => localStorageId === id)
    .length ? setHiddenValue(true) : setHiddenValue(false)
);

const getDrinksLocalStorage = (setTextBtn, id) => (
  localStorage.getItem('inProgressRecipes')
  && Object.keys(JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails)
    .includes(id) ? setTextBtn('Continuar Receita') : setTextBtn('Iniciar Receita')
);

const getDrinksFavorites = (setImgFavorite, id) => (
  (JSON.parse(localStorage.getItem('favoriteRecipes')) || [])
    .filter(({ id: localStorageId }) => localStorageId === id)
    .length ? setImgFavorite(blackHeartIcon) : setImgFavorite(whiteHeartIcon)
);

const copyURL = (route, setTextLink, textLink) => {
  const SEC = 3000;
  copy(`http://localhost:3000${route}`);
  if (textLink === '') {
    setTextLink('Link copiado!');
    setTimeout(() => {
      setTextLink('');
    }, SEC);
  }
};

function DrinkId() {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const route = location.pathname;
  const stopCart = 5;
  const style = {
    bottom: '0px',
    position: 'fixed',
  };

  const [drinkForId, setDrinkForId] = useState([]);
  const [hiddenValue, setHiddenValue] = useState(false);
  const [textBtn, setTextBtn] = useState('');
  const [textLink, setTextLink] = useState('');
  const [imgFavorite, setImgFavorite] = useState(whiteHeartIcon);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { inProgressRecipes, setInProgressRecipes, foods } = useContext(context);
  const { cocktails } = inProgressRecipes;
  const arrIngredients = Object.entries(drinkForId);
  const {
    idDrink,
    strDrink,
    strAlcoholic,
    strInstructions,
    strCategory,
    strDrinkThumb } = drinkForId;

  useEffect(() => {
    const favoriteRecipes = (JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes]));
    setHidden(setHiddenValue, id);
    getDrinksLocalStorage(setTextBtn, id);
    getDrinksFavorites(setImgFavorite, id);
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

  const addFavoriteRecipes = () => {
    const favoriteRecipes = (JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, {
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    }]));
    getDrinksFavorites(setImgFavorite, id);
  };

  const delFavoriteRecipes = () => {
    const favoriteRecipes = (JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
    localStorage
      .setItem('favoriteRecipes', JSON
        .stringify(favoriteRecipes.filter((recipe) => recipe.id !== id)));
    getDrinksFavorites(setImgFavorite, id);
  };

  const clickFavorite = () => (
    (JSON.parse(localStorage.getItem('favoriteRecipes')) || [])
      .filter(({ id: localStorageId }) => localStorageId === id)
      .length ? delFavoriteRecipes() : addFavoriteRecipes()
  );

  if (shouldRedirect) return <Redirect to={ `/bebidas/${id}/in-progress` } />;
  if (!drinkForId) return <div>Loading...</div>;

  return (
    <div>
      <img
        className="img-details"
        src={ strDrinkThumb }
        alt="receita pronta"
        data-testid="recipe-photo"
      />
      <span>{textLink}</span>
      <section>
        <p data-testid="recipe-title">{strDrink}</p>
        <p data-testid="recipe-category">{strAlcoholic}</p>
        <button
          type="button"
          onClick={ () => copyURL(route, setTextLink, textLink) }
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt="share-icon" />
        </button>
        <button
          type="button"
          onClick={ clickFavorite }
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
        <div className="recomendation-container">
          {
            foods.filter((_, index) => index <= stopCart)
              .map((food, index) => (
                <div
                  className="recomendation-card"
                  key={ food.idMeal }
                  data-testid={ `${index}-recomendation-card` }
                >
                  <img
                    src={ food.strMealThumb }
                    alt="Receita pronta"
                    data-testid={ `${index}-card-img` }
                  />
                  <p data-testid={ `${index}-recomendation-title` }>{food.strMeal}</p>
                </div>
              ))
          }
        </div>
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
