import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useStateEasyRedux } from 'easy-redux-trybe';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import positions from '../../services/data';
import createIngredients from '../../services/functions';

import styles from '../../styles/DetailsPages.module.scss';

function FoodDetails(props) {
  const { match: { params: { id } } } = props;

  const history = useHistory();
  const [, setStateRedux] = useStateEasyRedux(FoodDetails, {});

  useEffect(() => {
    const fetchRecipie = async () => {
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
    };
    fetchRecipie();
  }, []);

  const foods = useSelector((state) => (
    state.FoodDetails ? state.FoodDetails.responseFood : undefined
  ));

  const drinksRecommendations = useSelector((state) => (
    state.FoodDetails ? state.FoodDetails.resultRecommendations : undefined
  ));

  const choiceRec = (element) => history.push(`/bebidas/${element}`);

  console.log(foods);

  return (
    <div>
      {foods && foods.map(
        (el) => (
          <div className={ styles.areaRecipie } key={ el.idMeal }>
            <img
              src={ el.strMealThumb }
              alt={ el.strMeal }
              data-testid="recipe-photo"
              className={ styles.imgThumb }
            />
            <div className={ styles.containerContent }>
              <h1 data-testid="recipe-title">{ el.strMeal }</h1>
              <button type="button" data-testid="share-btn">compartilhar</button>
              <button type="button" data-testid="favorite-btn">favoritar</button>
              <p data-testid="recipe-category">{ el.strCategory }</p>
              <ul>
                {positions
                  .map((position, index) => createIngredients({ el, position, index }))}
              </ul>
              <p data-testid="instructions">{ el.strInstructions }</p>
              <embed
                type="video/mp4"
                src={ el.strYoutube }
                width="400"
                height="300"
                data-testid="video"
              />
              <h3>Recomendações</h3>
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
              className={ styles.startRecipie }
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
