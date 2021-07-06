import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useStateEasyRedux } from 'easy-redux-trybe';
import { useSelector } from 'react-redux';
import positions from '../../services/data';
import createIngredients from '../../services/functions';

function FoodDetails(props) {
  const { match: { params: { id } } } = props;

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
      const responseReccomendations = resultDrinks.drinks;
      const INDEX_END = 6;
      const resultReccomendations = responseReccomendations.slice(0, INDEX_END);
      setStateRedux({ actionType: 'FETCH_FOOD', responseFood, resultReccomendations });
    };
    fetchRecipie();
  }, []);

  const foods = useSelector((state) => (
    state.FoodDetails ? state.FoodDetails.responseFood : undefined
  ));

  console.log(foods);

  return (
    <div>
      Comida
      { id }
      {foods && foods.map(
        (el) => (
          <div className="teste-details" key={ el.idMeal }>
            <img src={ el.strMealThumb } alt={ el.strMeal } data-testid="recipe-photo" />
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
            <div data-testid="0-recomendation-card">recomendação</div>
            <button type="button" data-testid="start-recipe-btn">Iniciar</button>
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
