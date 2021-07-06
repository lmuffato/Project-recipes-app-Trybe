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
      const requestFood = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const dataFood = await requestFood.json();
      const responseFood = dataFood.meals;
      setStateRedux({ actionType: 'FETCH_FOOD', responseFood });
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
