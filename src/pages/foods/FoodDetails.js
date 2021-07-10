import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useStateEasyRedux } from 'easy-redux-trybe';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import positions from '../../services/data';
import createIngredients from '../../services/functions';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

import styles from '../../styles/DetailsPages.module.scss';

function FoodDetails(props) {
  const { match: { params: { id } } } = props;

  const history = useHistory();
  const [, setStateRedux] = useStateEasyRedux(FoodDetails, {});
  const [, setCopyUrl] = useStateEasyRedux({ name: 'copyFood' }, {});
  const [, setFavoriteRecipe] = useStateEasyRedux({ name: 'favoriteRecipe' }, {});

  useEffect(() => {
    const fetchRecipe = async () => {
      const requestFood = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const recommendations = fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');

      const [dataFood, dataRecommendations] = await Promise
        .all([requestFood, recommendations]);

      const resultFood = await dataFood.json();
      const responseFood = resultFood.meals;

      const resultDrinks = await dataRecommendations.json();
      const responseRecommendations = resultDrinks.drinks;
      const INDEX_END = 6;
      const resultRecommendations = responseRecommendations.slice(0, INDEX_END);
      setStateRedux({ actionType: 'FETCH_FOOD', responseFood, resultRecommendations });
      setCopyUrl({ actionType: 'COPY_URL', copyRecipe: false });

      const getRecipe = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const resultGet = getRecipe.some((element) => element.id === id);
      setFavoriteRecipe({ actionType: 'FAVORITE_RECIPE', favorite: resultGet });
    };
    fetchRecipe();
    // eslint-disable-next-line
  }, []);

  const foods = useSelector((state) => (
    state.FoodDetails ? state.FoodDetails.responseFood : undefined
  ));

  const drinksRecommendations = useSelector((state) => (
    state.FoodDetails ? state.FoodDetails.resultRecommendations : undefined
  ));

  const copyTrue = useSelector((state) => (
    state.copyFood ? state.copyFood.copyRecipe : undefined
  ));

  const favorite = useSelector((state) => (
    state.favoriteRecipe ? state.favoriteRecipe.favorite : undefined
  ));

  const choiceRec = (element) => history.push(`/bebidas/${element}`);

  const copyUrl = () => {
    copy(window.location.href.toString());
    setCopyUrl({ copyRecipe: true });
    const time = 3000;
    setTimeout(() => {
      setCopyUrl({ copyRecipe: false });
    }, time);
  };

  const clickFavorite = ({ idMeal, strArea, strCategory, strMeal, strMealThumb }) => {
    if (!favorite) {
      const favoriteRecipe = [{
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipe));
    } else {
      const removeFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'))
        .filter((el) => el.id !== idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
    }
    setFavoriteRecipe({ favorite: !favorite });
  };

  console.log(foods);

  return (
    <div>
      {foods && foods.map(
        (el) => (
          <div className={ styles.areaRecipe } key={ el.idMeal }>
            <img
              src={ el.strMealThumb }
              alt={ el.strMeal }
              data-testid="recipe-photo"
              className={ styles.imgThumb }
            />
            <div className={ styles.containerContent }>
              {copyTrue && <span className={ styles.copyUrl }>Link copiado!</span>}
              <div className={ styles.headerContent }>
                <h1 data-testid="recipe-title">{ el.strMeal }</h1>
                <button
                  type="button"
                  data-testid="share-btn"
                  onClick={ () => copyUrl() }
                >
                  <img src={ shareIcon } alt="Compartilhar" />
                </button>
                <button
                  type="button"
                  onClick={ () => clickFavorite(el) }
                  src={ favorite ? blackHeartIcon : whiteHeartIcon }
                  data-testid="favorite-btn"
                >
                  <img
                    src={ favorite ? blackHeartIcon : whiteHeartIcon }
                    alt="Favoritado"
                  />
                </button>
              </div>
              <p data-testid="recipe-category">{ el.strCategory }</p>
              <h3>Ingredients</h3>
              <ul>
                {positions
                  .map((position, index) => createIngredients({ el, position, index }))}
              </ul>
              <h3>Instructions</h3>
              <p data-testid="instructions">{ el.strInstructions }</p>
              <embed
                type="video/mp4"
                src={ el.strYoutube }
                width="400"
                height="300"
                data-testid="video"
              />
              <h3>Recommendations</h3>
              <div className={ styles.carousel }>
                {drinksRecommendations && drinksRecommendations.map((element, index) => (
                  <div
                    key={ element.idDrink }
                    data-testid={ `${index}-recomendation-card` }
                    className={ styles.cardRecommendation }
                    onClick={ () => choiceRec(element.idDrink) }
                    aria-hidden="true"
                  >
                    <img src={ element.strDrinkThumb } alt="Drink" />
                    <h3 data-testid={ `${index}-recomendation-title` }>
                      { element.strDrink }
                    </h3>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              data-testid="start-recipe-btn"
              className={ styles.startRecipe }
            >
              Iniciar Receita
            </button>
          </div>
        ),
      )}
    </div>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default FoodDetails;
